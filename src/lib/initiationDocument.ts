import type { Society } from "@/data/societies";

/**
 * The two things a visitor can take away.
 *
 *  - The certificate: a nineteenth-century university document, on paper,
 *    because a document should look like paper rather than like a poster.
 *  - The story card: 9:16 and dark, because that one is a poster.
 *
 * Both are drawn in the browser from the same copy the page shows. Nothing is
 * uploaded and no name ever leaves the device.
 */

const DISPLAY = '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif';
const BODY = 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

export type DocumentInput = {
  society: Society;
  /** Optional, entered by the visitor, never stored. */
  name: string;
  secondary: string | null;
};

/** Deterministic noise, so the same certificate is the same twice. */
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`asset failed: ${src}`));
    img.src = src;
  });

/** Centre a block of text, wrapping on width; report where it ended. */
function centred(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  top: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  lines.forEach((l, i) => ctx.fillText(l, cx, top + i * lineHeight));
  return top + lines.length * lineHeight;
}

/** An engraved double rule with a lozenge at its centre. */
function ornament(ctx: CanvasRenderingContext2D, cx: number, y: number, half: number, colour: string) {
  ctx.strokeStyle = colour;
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.moveTo(cx - half, y);
  ctx.lineTo(cx - 22, y);
  ctx.moveTo(cx + 22, y);
  ctx.lineTo(cx + half, y);
  ctx.stroke();
  ctx.save();
  ctx.translate(cx, y);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = colour;
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();
}

/** Wax: an irregular disc, lit from the upper left, stamped with a lozenge. */
function waxSeal(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number) {
  const random = seeded(97);
  ctx.save();
  ctx.beginPath();
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += Math.PI / 36) {
    // Wax never sets in a perfect circle.
    const wobble = r * (1 + Math.sin(a * 5) * 0.035 + (random() - 0.5) * 0.045);
    const x = cx + Math.cos(a) * wobble;
    const y = cy + Math.sin(a) * wobble;
    a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();

  const body = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.35, r * 0.1, cx, cy, r * 1.1);
  body.addColorStop(0, "#9c2440");
  body.addColorStop(0.55, "#751328");
  body.addColorStop(1, "#4a0a18");
  ctx.fillStyle = body;
  ctx.shadowColor = "rgba(60, 30, 10, 0.45)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  ctx.fill();
  ctx.restore();

  // The impression: a ring and a lozenge pressed into the wax.
  ctx.save();
  ctx.strokeStyle = "rgba(255, 220, 220, 0.2)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.66, 0, Math.PI * 2);
  ctx.stroke();
  ctx.translate(cx, cy);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = "rgba(40, 6, 14, 0.5)";
  ctx.fillRect(-r * 0.2, -r * 0.2, r * 0.4, r * 0.4);
  ctx.restore();
}

/* ── The certificate ─────────────────────────────────────────────────── */

const C_W = 1654;
const C_H = 2339;

export async function drawCertificate(canvas: HTMLCanvasElement, input: DocumentInput): Promise<void> {
  const { society, name } = input;
  canvas.width = C_W;
  canvas.height = C_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  if (document.fonts?.ready) await document.fonts.ready;

  const ink = "#2a2018";
  const faded = "#6b5c4a";
  const rule = "#9c8769";

  // Paper.
  ctx.fillStyle = "#e9dec6";
  ctx.fillRect(0, 0, C_W, C_H);

  // Age: soft mottling, then a darkening toward the edges.
  const random = seeded(31);
  for (let i = 0; i < 160; i++) {
    const x = random() * C_W;
    const y = random() * C_H;
    const r = 60 + random() * 260;
    const blot = ctx.createRadialGradient(x, y, 0, x, y, r);
    const warm = random() > 0.45;
    blot.addColorStop(0, warm ? "rgba(176, 148, 102, 0.07)" : "rgba(238, 230, 208, 0.09)");
    blot.addColorStop(1, "transparent");
    ctx.fillStyle = blot;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }
  const edge = ctx.createRadialGradient(C_W / 2, C_H / 2, C_H * 0.3, C_W / 2, C_H / 2, C_H * 0.78);
  edge.addColorStop(0, "transparent");
  edge.addColorStop(1, "rgba(120, 92, 54, 0.3)");
  ctx.fillStyle = edge;
  ctx.fillRect(0, 0, C_W, C_H);

  // Engraved border: a heavy rule, a hair rule, and corner lozenges.
  ctx.strokeStyle = rule;
  ctx.lineWidth = 3;
  ctx.strokeRect(84, 84, C_W - 168, C_H - 168);
  ctx.lineWidth = 1;
  ctx.strokeRect(104, 104, C_W - 208, C_H - 208);
  for (const [x, y] of [[84, 84], [C_W - 84, 84], [84, C_H - 84], [C_W - 84, C_H - 84]]) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = rule;
    ctx.fillRect(-9, -9, 18, 18);
    ctx.restore();
  }

  ctx.textAlign = "center";
  const cx = C_W / 2;

  ctx.fillStyle = faded;
  ctx.font = `500 30px ${BODY}`;
  ctx.letterSpacing = "11px";
  ctx.fillText("ALDERWICK UNIVERSITY", cx, 250);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = ink;
  ctx.font = `400 74px ${DISPLAY}`;
  ctx.fillText("Certificate of Initiation", cx, 350);

  ornament(ctx, cx, 420, 300, rule);

  // The crest, in ink rather than in gold: this is a printed document.
  try {
    const crest = await loadImage(society.crest);
    const size = 440;
    ctx.save();
    ctx.globalAlpha = 0.9;
    ctx.filter = "grayscale(1) brightness(0.35) contrast(1.5)";
    ctx.drawImage(crest, cx - size / 2, 470, size, size);
    ctx.restore();
  } catch {
    // The document stands without the engraving.
  }

  ctx.fillStyle = faded;
  ctx.font = `400 34px ${DISPLAY}`;
  ctx.fillText("Be it known that", cx, 1020);

  ctx.fillStyle = ink;
  ctx.font = `italic 400 78px ${DISPLAY}`;
  ctx.fillText(name.trim() || "the bearer of this document", cx, 1118);

  // The ruled line a name is written on.
  ctx.strokeStyle = "rgba(107, 92, 74, 0.45)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(cx - 460, 1150);
  ctx.lineTo(cx + 460, 1150);
  ctx.stroke();

  ctx.fillStyle = ink;
  ctx.font = `400 38px ${DISPLAY}`;
  let y = centred(ctx, society.verdict.acceptance, cx, 1232, C_W - 460, 56);

  ornament(ctx, cx, y + 60, 230, rule);

  ctx.fillStyle = faded;
  ctx.font = `500 26px ${BODY}`;
  ctx.letterSpacing = "9px";
  ctx.fillText(society.identity.toUpperCase(), cx, y + 160);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = ink;
  ctx.font = `400 82px ${DISPLAY}`;
  ctx.fillText(society.name, cx, y + 256);

  ctx.fillStyle = faded;
  ctx.font = `italic 400 40px ${DISPLAY}`;
  centred(ctx, `“${society.motto}”`, cx, y + 330, C_W - 500, 54);

  waxSeal(ctx, cx, C_H - 420, 112);

  ctx.fillStyle = faded;
  ctx.font = `italic 400 36px ${DISPLAY}`;
  ctx.fillText("Things I Shouldn't Say", cx, C_H - 220);
  ctx.font = `500 24px ${BODY}`;
  ctx.letterSpacing = "7px";
  ctx.fillText("HEYDASHADAY.COM", cx, C_H - 160);
  ctx.letterSpacing = "0px";
}

/* ── The story card ──────────────────────────────────────────────────── */

const S_W = 1080;
const S_H = 1920;

export async function drawStoryCard(canvas: HTMLCanvasElement, input: DocumentInput): Promise<void> {
  const { society, name, secondary } = input;
  canvas.width = S_W;
  canvas.height = S_H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  if (document.fonts?.ready) await document.fonts.ready;

  const { palette } = society;

  ctx.fillStyle = palette.ground;
  ctx.fillRect(0, 0, S_W, S_H);

  const ember = ctx.createRadialGradient(S_W / 2, S_H * 0.3, 0, S_W / 2, S_H * 0.3, S_W * 0.78);
  ember.addColorStop(0, `${palette.accent}2b`);
  ember.addColorStop(1, "transparent");
  ctx.fillStyle = ember;
  ctx.fillRect(0, 0, S_W, S_H);

  const vignette = ctx.createRadialGradient(S_W / 2, S_H / 2, S_H * 0.24, S_W / 2, S_H / 2, S_H * 0.72);
  vignette.addColorStop(0, "transparent");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.74)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, S_W, S_H);

  ctx.strokeStyle = `${palette.accent}3d`;
  ctx.lineWidth = 2;
  ctx.strokeRect(54, 54, S_W - 108, S_H - 108);

  try {
    const crest = await loadImage(society.crest);
    ctx.drawImage(crest, (S_W - 400) / 2, 250, 400, 400);
  } catch {
    // A card without the emblem is still a card.
  }

  ctx.textAlign = "center";
  const cx = S_W / 2;

  ctx.fillStyle = palette.accent;
  ctx.font = `500 26px ${BODY}`;
  ctx.letterSpacing = "8px";
  ctx.fillText("ALDERWICK UNIVERSITY", cx, 780);
  ctx.letterSpacing = "0px";

  if (name.trim()) {
    ctx.fillStyle = palette.textSoft;
    ctx.font = `italic 400 40px ${DISPLAY}`;
    ctx.fillText(`${name.trim()}, the society has chosen.`, cx, 848);
  }

  ctx.fillStyle = palette.text;
  ctx.font = `400 88px ${DISPLAY}`;
  let y = centred(ctx, society.name.toUpperCase(), cx, name.trim() ? 952 : 910, S_W - 160, 100);

  ctx.fillStyle = palette.textSoft;
  ctx.font = `italic 400 46px ${DISPLAY}`;
  y = centred(ctx, society.archetype, cx, y + 54, S_W - 200, 56);

  ornament(ctx, cx, y + 58, 190, `${palette.accent}99`);

  ctx.fillStyle = palette.text;
  ctx.font = `italic 400 54px ${DISPLAY}`;
  y = centred(ctx, `“${society.signatureLine}”`, cx, y + 160, S_W - 200, 74);

  if (secondary) {
    ctx.fillStyle = palette.textSoft;
    ctx.font = `400 32px ${BODY}`;
    centred(ctx, `with a second hand on the door — ${secondary}`, cx, y + 70, S_W - 240, 44);
  }

  ctx.fillStyle = palette.textSoft;
  ctx.font = `italic 400 42px ${DISPLAY}`;
  ctx.fillText("Things I Shouldn't Say", cx, S_H - 200);

  ctx.fillStyle = palette.accent;
  ctx.font = `500 24px ${BODY}`;
  ctx.letterSpacing = "7px";
  ctx.fillText("HEYDASHADAY.COM", cx, S_H - 120);
  ctx.letterSpacing = "0px";
}

/* ── Handing it over ─────────────────────────────────────────────────── */

const toBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

/**
 * The share sheet where there is one — that is the route into Instagram on a
 * phone — and a download everywhere else.
 */
export async function handOver(canvas: HTMLCanvasElement, filename: string, title: string): Promise<string> {
  const blob = await toBlob(canvas);
  if (!blob) return "This browser could not prepare the image.";

  const file = new File([blob], filename, { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title });
      return "Ready to share.";
    } catch (error) {
      // A cancelled share sheet is a choice, not a failure.
      if ((error as Error)?.name === "AbortError") return "";
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return "Saved to your downloads.";
}

/** Share the page itself: the sheet, or the clipboard as a fallback. */
export async function shareLink(url: string, text: string): Promise<string> {
  if (navigator.share) {
    try {
      await navigator.share({ url, text, title: "Which Alderwick Society would choose you?" });
      return "";
    } catch (error) {
      if ((error as Error)?.name === "AbortError") return "";
    }
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    return "Link copied.";
  } catch {
    return url;
  }
}
