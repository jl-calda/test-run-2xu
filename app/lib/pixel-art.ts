import { RunnerTraits } from "./types";

// --- Color palettes by vibe ---
const OUTFIT_COLORS: Record<RunnerTraits["vibe"], { primary: string; secondary: string }> = {
  chill:    { primary: "#3b82f6", secondary: "#60a5fa" },  // blue
  speedy:   { primary: "#ef4444", secondary: "#f87171" },  // red
  explorer: { primary: "#22c55e", secondary: "#4ade80" },  // green
  party:    { primary: "#a855f7", secondary: "#c084fc" },  // purple
};

const GLOW_COLORS: Record<RunnerTraits["time"], string> = {
  sunrise: "#fbbf24",
  noon:    "#fde68a",
  sunset:  "#f97316",
  night:   "#6366f1",
};

// --- Pixel body template (32x48, each cell = 1 pixel) ---
// Legend: 0=empty, 1=skin, 2=primary, 3=secondary, 4=shoe, 5=hair
// Frame 1 (left leg forward), Frame 2 (right leg forward)
// We draw programmatically instead of encoding a full bitmap

const BODY_W = 32;
const BODY_H = 48;
const FACE_Y = 4;
const FACE_X = 8;
const FACE_SIZE = 16; // 16x16 face area on the 32x48 body

function drawPixelBody(
  ctx: CanvasRenderingContext2D,
  offsetX: number,
  colors: { primary: string; secondary: string; shoe: string; skin: string },
  frame: 0 | 1
) {
  const px = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(offsetX + x, y, 1, 1);
  };

  const rect = (x: number, y: number, w: number, h: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(offsetX + x, y, w, h);
  };

  // Hair top (2px above face)
  rect(9, 2, 14, 3, "#2d1b0e");

  // Face area will be composited separately (8-23, 4-19)
  // Neck
  rect(13, 20, 6, 2, colors.skin);

  // Torso (shirt - primary color)
  rect(8, 22, 16, 10, colors.primary);
  // Shirt detail stripe
  rect(8, 25, 16, 2, colors.secondary);

  // Arms
  rect(5, 23, 3, 8, colors.skin);   // left arm
  rect(24, 23, 3, 8, colors.skin);  // right arm
  // Sleeves
  rect(5, 22, 3, 3, colors.primary);
  rect(24, 22, 3, 3, colors.primary);

  // Shorts
  rect(9, 32, 14, 5, colors.secondary);

  // Legs + shoes (frame-dependent)
  if (frame === 0) {
    // Left leg forward
    rect(9, 37, 5, 6, colors.skin);
    rect(9, 43, 6, 3, colors.shoe);
    // Right leg back
    rect(18, 37, 5, 4, colors.skin);
    rect(18, 41, 6, 3, colors.shoe);
  } else {
    // Right leg forward
    rect(18, 37, 5, 6, colors.skin);
    rect(17, 43, 6, 3, colors.shoe);
    // Left leg back
    rect(9, 37, 5, 4, colors.skin);
    rect(8, 41, 6, 3, colors.shoe);
  }
}

function drawAccessory(
  ctx: CanvasRenderingContext2D,
  offsetX: number,
  animal: RunnerTraits["animal"]
) {
  const px = (x: number, y: number, color: string) => {
    ctx.fillStyle = color;
    ctx.fillRect(offsetX + x, y, 1, 1);
  };

  switch (animal) {
    case "cat":
      // Cat ears
      px(8, 1, "#2d1b0e"); px(9, 0, "#2d1b0e"); px(10, 1, "#2d1b0e");
      px(21, 1, "#2d1b0e"); px(22, 0, "#2d1b0e"); px(23, 1, "#2d1b0e");
      // Inner ear pink
      px(9, 1, "#f9a8d4");
      px(22, 1, "#f9a8d4");
      break;
    case "dog":
      // Bandana around neck
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(offsetX + 10, 20, 12, 2);
      px(15, 22, "#ef4444"); px(16, 22, "#ef4444");
      px(15, 23, "#ef4444");
      break;
    case "bird":
      // Small wings on back
      ctx.fillStyle = "#fbbf24";
      ctx.fillRect(offsetX + 3, 24, 3, 4);
      ctx.fillRect(offsetX + 26, 24, 3, 4);
      px(2, 25, "#fbbf24"); px(29, 25, "#fbbf24");
      px(1, 26, "#fbbf24"); px(30, 26, "#fbbf24");
      break;
    case "dragon":
      // Small horns
      px(10, 0, "#f97316"); px(10, 1, "#f97316"); px(11, 1, "#f97316");
      px(21, 0, "#f97316"); px(21, 1, "#f97316"); px(20, 1, "#f97316");
      // Tail
      ctx.fillStyle = "#f97316";
      ctx.fillRect(offsetX + 24, 34, 4, 2);
      ctx.fillRect(offsetX + 27, 32, 3, 2);
      px(29, 31, "#f97316");
      break;
  }
}

/**
 * Pixelate an image to a grid. Returns ImageData of the pixelated result.
 */
export function pixelateFace(
  sourceCanvas: HTMLCanvasElement,
  gridSize: number = 16
): ImageData {
  const size = gridSize;
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = size;
  tempCanvas.height = size;
  const tempCtx = tempCanvas.getContext("2d")!;

  // Get the center square crop from source
  const src = sourceCanvas;
  const minDim = Math.min(src.width, src.height);
  const sx = (src.width - minDim) / 2;
  const sy = (src.height - minDim) / 2;

  // Draw scaled down (this automatically averages pixels = pixelation)
  tempCtx.drawImage(src, sx, sy, minDim, minDim, 0, 0, size, size);

  return tempCtx.getImageData(0, 0, size, size);
}

/**
 * Compose a full pixel art character with face, body, accessories.
 * Returns a base64 data URL of a 64x48 sprite sheet (2 frames).
 */
export function composePixelCharacter(
  faceData: ImageData,
  traits: RunnerTraits
): string {
  const SPRITE_W = BODY_W * 2; // 64px wide (2 frames)
  const SPRITE_H = BODY_H;     // 48px tall

  const canvas = document.createElement("canvas");
  canvas.width = SPRITE_W;
  canvas.height = SPRITE_H;
  const ctx = canvas.getContext("2d")!;

  // Disable smoothing for crisp pixels
  ctx.imageSmoothingEnabled = false;

  const outfit = OUTFIT_COLORS[traits.vibe];
  const bodyColors = {
    primary: outfit.primary,
    secondary: outfit.secondary,
    shoe: "#1e293b",
    skin: "#f0c090",
  };

  // Draw frame 1 (left side of sprite sheet)
  drawPixelBody(ctx, 0, bodyColors, 0);
  drawAccessory(ctx, 0, traits.animal);

  // Draw frame 2 (right side of sprite sheet)
  drawPixelBody(ctx, BODY_W, bodyColors, 1);
  drawAccessory(ctx, BODY_W, traits.animal);

  // Composite pixelated face onto both frames
  const faceCanvas = document.createElement("canvas");
  faceCanvas.width = FACE_SIZE;
  faceCanvas.height = FACE_SIZE;
  const faceCtx = faceCanvas.getContext("2d")!;

  // Scale face data to FACE_SIZE
  const tempFace = document.createElement("canvas");
  tempFace.width = faceData.width;
  tempFace.height = faceData.height;
  tempFace.getContext("2d")!.putImageData(faceData, 0, 0);

  faceCtx.imageSmoothingEnabled = false;
  faceCtx.drawImage(tempFace, 0, 0, FACE_SIZE, FACE_SIZE);

  // Place face on frame 1
  ctx.drawImage(faceCanvas, FACE_X, FACE_Y);
  // Place face on frame 2
  ctx.drawImage(faceCanvas, BODY_W + FACE_X, FACE_Y);

  // Add glow outline based on time-of-day
  const glowColor = GLOW_COLORS[traits.time];
  ctx.strokeStyle = glowColor;
  ctx.lineWidth = 0.5;
  // Subtle glow ring around head (frame 1)
  ctx.beginPath();
  ctx.arc(16, 12, 10, 0, Math.PI * 2);
  ctx.stroke();
  // Frame 2
  ctx.beginPath();
  ctx.arc(BODY_W + 16, 12, 10, 0, Math.PI * 2);
  ctx.stroke();

  return canvas.toDataURL("image/png");
}

/**
 * Generate a pixel character without a selfie (placeholder with random face colors).
 * Useful for preview or when camera is unavailable.
 */
export function generatePlaceholderCharacter(
  name: string,
  traits: RunnerTraits
): string {
  // Create a deterministic "face" from the name
  const canvas = document.createElement("canvas");
  canvas.width = 16;
  canvas.height = 16;
  const ctx = canvas.getContext("2d")!;

  // Simple hash from name for color variation
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
  }

  const hue = Math.abs(hash) % 360;
  const skinBase = `hsl(${(hue + 30) % 360}, 40%, 70%)`;
  const eyeColor = `hsl(${(hue + 180) % 360}, 60%, 40%)`;

  // Fill face area with skin color
  ctx.fillStyle = skinBase;
  ctx.fillRect(0, 0, 16, 16);

  // Simple pixel eyes
  ctx.fillStyle = eyeColor;
  ctx.fillRect(4, 6, 3, 3);
  ctx.fillRect(9, 6, 3, 3);
  // Eye whites
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(5, 7, 1, 1);
  ctx.fillRect(10, 7, 1, 1);

  // Simple mouth
  ctx.fillStyle = "#c0392b";
  ctx.fillRect(6, 11, 4, 1);

  // Cheeks
  ctx.fillStyle = `hsl(${hue}, 50%, 75%)`;
  ctx.fillRect(2, 9, 2, 2);
  ctx.fillRect(12, 9, 2, 2);

  const faceData = ctx.getImageData(0, 0, 16, 16);
  return composePixelCharacter(faceData, traits);
}
