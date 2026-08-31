/**
 * EXIF orientation parser & Canvas rotation matrix helper.
 * Strips EXIF metadata while preserving correct orientation when redrawn on Canvas.
 */

export interface ExifOrientation {
  orientation: number;
  rotationDeg: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
}

/**
 * Extract EXIF Orientation from a JPEG File / Blob ArrayBuffer.
 * Returns 1 (normal) if not found or non-JPEG.
 */
export function getExifOrientation(buffer: ArrayBuffer): number {
  const view = new DataView(buffer);
  if (view.getUint16(0, false) !== 0xffd8) {
    return 1; // Not a JPEG
  }

  const length = view.byteLength;
  let offset = 2;

  while (offset < length) {
    if (view.getUint16(offset, false) === 0xffe1) {
      // APP1 Marker
      if (view.getUint32(offset + 4, false) !== 0x45786966) {
        return 1; // Not EXIF header
      }

      const little = view.getUint16(offset + 10, false) === 0x4949;
      offset += 12;

      const tags = view.getUint16(offset, little);
      offset += 2;

      for (let i = 0; i < tags; i++) {
        if (view.getUint16(offset + i * 12, little) === 0x0112) {
          // Orientation tag
          return view.getUint16(offset + i * 12 + 8, little);
        }
      }
    } else if ((view.getUint16(offset, false) & 0xff00) !== 0xff00) {
      break;
    } else {
      offset += 2 + view.getUint16(offset + 2, false);
    }
  }

  return 1;
}

/**
 * Apply canvas rotation / scaling context transform based on EXIF orientation.
 */
export function transformCanvasContextForOrientation(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  orientation: number,
  width: number,
  height: number
) {
  switch (orientation) {
    case 2:
      // horizontal flip
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
      break;
    case 3:
      // 180 rotate
      ctx.translate(width, height);
      ctx.rotate(Math.PI);
      break;
    case 4:
      // vertical flip
      ctx.translate(0, height);
      ctx.scale(1, -1);
      break;
    case 5:
      // vertical flip + 90 rotate CW
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break;
    case 6:
      // 90 rotate CW
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(0, -height);
      break;
    case 7:
      // horizontal flip + 90 rotate CW
      ctx.rotate(0.5 * Math.PI);
      ctx.translate(width, -height);
      ctx.scale(-1, 1);
      break;
    case 8:
      // 270 rotate CW
      ctx.rotate(-0.5 * Math.PI);
      ctx.translate(-width, 0);
      break;
    default:
      break;
  }
}
