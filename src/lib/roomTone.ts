/**
 * Room tone.
 *
 * A hall at night is not silent; it has a floor of air. This synthesises that
 * floor rather than shipping an audio file: filtered noise, a slow sway on the
 * filter, and a very low gain. No asset, no request, a few hundred bytes.
 *
 * Never starts on its own. The browser would refuse, and so should we.
 */

export type RoomTone = { start: () => Promise<void>; stop: () => void; dispose: () => void };

export function createRoomTone(): RoomTone | null {
  const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;

  let ctx: AudioContext | null = null;
  let gain: GainNode | null = null;
  let source: AudioBufferSourceNode | null = null;
  let sway: OscillatorNode | null = null;

  const build = (context: AudioContext) => {
    // Brown-ish noise: a random walk reads as air, white noise reads as a fault.
    const seconds = 4;
    const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.021 * white) / 1.02;
      data[i] = last * 3.2;
    }

    const noise = context.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 320;
    filter.Q.value = 0.5;

    // The room breathes, slowly, so it never sits still enough to notice.
    const lfo = context.createOscillator();
    lfo.frequency.value = 0.045;
    const lfoDepth = context.createGain();
    lfoDepth.gain.value = 90;
    lfo.connect(lfoDepth).connect(filter.frequency);

    const out = context.createGain();
    out.gain.value = 0;

    noise.connect(filter).connect(out).connect(context.destination);
    noise.start();
    lfo.start();

    source = noise;
    sway = lfo;
    gain = out;
  };

  return {
    async start() {
      if (!ctx) {
        ctx = new Ctx();
        build(ctx);
      }
      await ctx.resume();
      gain?.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 2.5);
    },
    stop() {
      if (!ctx || !gain) return;
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
    },
    dispose() {
      try {
        source?.stop();
        sway?.stop();
        void ctx?.close();
      } catch {
        // Already gone.
      }
      ctx = null;
    },
  };
}
