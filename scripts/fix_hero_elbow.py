"""Build an opaque, seamless right-elbow tip — overwrite the flat crop edge."""

from __future__ import annotations

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


def main() -> None:
    cut = Image.open("public/images/coach/Screenshot 2026-07-12 135027-cutout.png").convert("RGBA")
    arr = np.array(cut).astype(np.float32)
    h, w = arr.shape[:2]
    a = arr[:, :, 3]

    y0, y1 = 188, 292
    left = []
    for y in range(y0, y1 + 1):
        xs = np.where(a[y, : w // 2] > 40)[0]
        left.append(int(xs.min()) if len(xs) else None)

    base = int(np.median([x for x in left[:20] if x is not None]))
    depths = [max(0, base - x) if x is not None else 0 for x in left]
    # Smooth depths
    d = np.array(depths, dtype=np.float32)
    for _ in range(4):
        d[1:-1] = 0.25 * d[:-2] + 0.5 * d[1:-1] + 0.25 * d[2:]
    depths = [int(round(min(max(v, 0), 40))) for v in d]
    extend = max(depths) + 12

    pad = 100
    canvas = np.zeros((h + pad * 2, w + pad * 2 + extend, 4), dtype=np.float32)
    canvas[pad : pad + h, pad : pad + w] = arr

    # Precompute skin color per row from just inside the flat edge
    for i, y in enumerate(range(y0, y1 + 1)):
        depth = depths[i]
        if depth < 2:
            continue

        # Sample opaque skin near edge
        colors = []
        for b in range(2, 20):
            px = arr[y, w - 1 - b]
            if px[3] > 200:
                colors.append(px[:3])
        if not colors:
            continue
        color = np.mean(colors, axis=0)

        cy = pad + y
        # Overwrite from 10px inside the crop outward to form a round tip
        total = 10 + depth
        for k in range(total + 1):
            # k=0 at x=w-10, k=total at tip
            x_orig = (w - 10) + k
            dest_x = pad + x_orig
            if dest_x >= canvas.shape[1]:
                break

            u = k / total  # 0 at body, 1 at tip
            # Elliptical alpha — solid until near tip
            edge = 1.0 - u
            # Keep fully opaque through most of the bulge
            if u < 0.82:
                alpha = 255.0
            else:
                t = (u - 0.82) / 0.18
                alpha = 255.0 * (1.0 - t * t)

            # Slight shade toward tip / underside
            shade = 1.0 - 0.08 * u
            col = np.clip(color * shade, 0, 255)

            # Only replace if we're past the old flat edge OR filling empty,
            # but DO overwrite the flat edge columns to remove the hard line
            past_flat = x_orig >= w - 1
            on_flat_zone = x_orig >= w - 10

            if not on_flat_zone:
                continue

            if past_flat or canvas[cy, dest_x, 3] < 250:
                # For flat zone interior, blend toward rounded silhouette:
                # only keep pixels inside the ellipse for this row
                # half-width of bulge at this row = depth
                # distance past (w-1):
                dist = x_orig - (w - 1)
                if dist > depth:
                    continue
                canvas[cy, dest_x, :3] = col
                canvas[cy, dest_x, 3] = alpha
            elif on_flat_zone and not past_flat:
                # Softly recolor edge column to remove jagged crop look
                oa = canvas[cy, dest_x, 3] / 255.0
                if oa > 0.5:
                    canvas[cy, dest_x, :3] = canvas[cy, dest_x, :3] * 0.7 + col * 0.3

    out = Image.fromarray(np.clip(canvas, 0, 255).astype(np.uint8), "RGBA")

    # Local blur + re-sharpen core: AA the new tip only
    tip_box = (pad + w - 12, pad + y0 - 2, pad + w + extend + 2, pad + y1 + 2)
    region = out.crop(tip_box)
    blurred = region.filter(ImageFilter.GaussianBlur(0.8))
    # Keep more of blur on alpha edges
    out.paste(Image.blend(region, blurred, 0.55), tip_box)

    out = out.resize((out.width * 3, out.height * 3), Image.Resampling.LANCZOS)
    out.save("public/images/coach/screenshot-2026-07-12-hero.png", optimize=True)
    out.save("public/images/coach/hero-official.png", optimize=True)

    # Debug crop
    a2 = np.array(out)
    ys, xs = np.where(a2[:, :, 3] > 40)
    # elbow debug
    y_mid = (pad + (y0 + y1) // 2) * 3
    crop = out.crop((out.width // 2, y_mid - 200, out.width - 80, y_mid + 200))
    bg = Image.new("RGBA", crop.size, (8, 10, 14, 255))
    bg.paste(crop, (0, 0), crop)
    bg.save("public/images/coach/_elbow-debug.png")
    print("saved", out.size, "extend", extend, "max_depth", max(depths))


if __name__ == "__main__":
    main()
