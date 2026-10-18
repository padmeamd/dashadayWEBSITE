import type { Society } from "@/data/societies";

/**
 * The shareable result, drawn as an image.
 *
 * A 1080×1920 card, which is the size an Instagram Story wants, rendered on a
 * canvas from the same copy the page shows. Nothing is uploaded: the file is
 * made in the browser and handed straight to the visitor.
 *
 * The crest artwork carries real transparency, so it is simply drawn: no
 * masking, and it sits correctly on each society's own ground.
 */

const W = 1080;
const H = 1920;

const DISPLAY = '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, serif';
const BODY = 'Inter, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif';

type CardInput = {
  society: Society;
  archetype: string;
  line: string;
  secondary: string | null;
};

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`crest failed: ${src}`));
    img.src = src;
  });

/** Draw text centred, wrapping on width, and report where the block ended. */
function centredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  top: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (ctx.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);

  lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * lineHeight));
  return top + lines.length * lineHeight;
}

export async function drawResultCard(canvas: HTMLCanvasElement, input: CardInput): Promise<void> {
  const { society, archetype, line, secondary } = input;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");

  // Metrics are wrong if the serif has not loaded yet.
  if (document.fonts?.ready) await document.fonts.ready;

  const { palette } = society;

  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = palette.ground;
  ctx.fillRect(0, 0, W, H);

  // An ember behind the emblem, then a vignette to hold the edges down.
  const ember = ctx.createRadialGradient(W / 2, H * 0.3, 0, W / 2, H * 0.3, W * 0.75);
  ember.addColorStop(0, `${palette.accent}26`);
  ember.addColorStop(1, "transparent");
  ctx.fillStyle = ember;
  ctx.fillRect(0, 0, W, H);

  const vignette = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.72);
  vignette.addColorStop(0, "transparent");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.72)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, W, H);

  // ── The emblem ──────────────────────────────────────────────────────
  try {
    const crest = await loadImage(society.crest);
    const size = 400;
    ctx.drawImage(crest, (W - size) / 2, 260, size, size);
  } catch {
    // A card without the emblem is still a card.
  }

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = palette.accent;
  ctx.font = `500 26px ${BODY}`;
  ctx.letterSpacing = "8px";
  ctx.fillText("ALDERWICK UNIVERSITY", W / 2, 790);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = palette.text;
  ctx.font = `400 92px ${DISPLAY}`;
  let y = centredText(ctx, society.name.toUpperCase(), 900, W - 160, 104);

  ctx.fillStyle = palette.textSoft;
  ctx.font = `italic 400 48px ${DISPLAY}`;
  y = centredText(ctx, archetype, y + 56, W - 200, 58);

  // The engraved rule.
  const ruleY = y + 60;
  ctx.strokeStyle = `${palette.accent}66`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 200, ruleY);
  ctx.lineTo(W / 2 - 18, ruleY);
  ctx.moveTo(W / 2 + 18, ruleY);
  ctx.lineTo(W / 2 + 200, ruleY);
  ctx.stroke();
  ctx.save();
  ctx.translate(W / 2, ruleY);
  ctx.rotate(Math.PI / 4);
  ctx.fillStyle = palette.accent;
  ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();

  ctx.fillStyle = palette.text;
  ctx.font = `italic 400 56px ${DISPLAY}`;
  y = centredText(ctx, `“${line}”`, ruleY + 110, W - 200, 76);

  if (secondary) {
    ctx.fillStyle = palette.textSoft;
    ctx.font = `400 34px ${BODY}`;
    y = centredText(ctx, `with a second hand on the door — ${secondary}`, y + 70, W - 220, 46);
  }

  ctx.fillStyle = palette.textSoft;
  ctx.font = `italic 400 40px ${DISPLAY}`;
  centredText(ctx, "Things I Shouldn't Say", H - 200, W - 200, 50);

  ctx.fillStyle = palette.accent;
  ctx.font = `500 24px ${BODY}`;
  ctx.letterSpacing = "6px";
  ctx.fillText("HEYDASHADAY.COM", W / 2, H - 120);
  ctx.letterSpacing = "0px";
}

const toBlob = (canvas: HTMLCanvasElement) =>
  new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

/**
 * Hand the card over: the share sheet where there is one — that is the route
 * to Instagram on a phone — and a download everywhere else.
 */
export async function saveResultCard(canvas: HTMLCanvasElement, filename: string): Promise<string> {
  const blob = await toBlob(canvas);
  if (!blob) return "The card could not be prepared in this browser.";

  const file = new File([blob], filename, { type: "image/png" });

  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return "Card ready to share.";
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
  URL.revokeObjectURL(url);
  return "Card saved to your downloads.";
}
