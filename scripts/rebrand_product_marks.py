"""Cover legacy R8 chest marks and place a subtle Diesel Way fist on product photos."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

PRODUCTS = Path("public/images/products")
MEALS = Path("public/images/meals")
LOGO = Path("public/brand/the-diesel-way-logo-approved.png")


def fist_mark(logo: Image.Image, size: int) -> Image.Image:
    """Extract upper fist area and make near-black pixels transparent."""
    w, h = logo.size
    crop = logo.crop((int(w * 0.22), int(h * 0.0), int(w * 0.78), int(h * 0.48))).convert("RGBA")
    # Square canvas
    side = max(crop.size)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(crop, ((side - crop.size[0]) // 2, (side - crop.size[1]) // 2), crop)
    pixels = canvas.load()
    for y in range(side):
        for x in range(side):
            r, g, b, a = pixels[x, y]
            # Drop dark background; keep bright fist
            brightness = (r + g + b) / 3
            if brightness < 40:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                # Force white mark for embroidery look
                alpha = int(min(255, brightness * 1.15))
                pixels[x, y] = (255, 255, 255, alpha)
    return canvas.resize((size, size), Image.Resampling.LANCZOS)


def cover_and_brand(path: Path, mark: Image.Image) -> None:
    im = Image.open(path).convert("RGBA")
    w, h = im.size

    # Typical left-chest embroidery zone (viewer right / garment left)
    # Cover a band where R8 marks commonly sit
    zones = [
        (int(w * 0.52), int(h * 0.28), int(w * 0.78), int(h * 0.42)),  # left chest
        (int(w * 0.38), int(h * 0.30), int(w * 0.62), int(h * 0.44)),  # center chest
        (int(w * 0.08), int(h * 0.78), int(w * 0.35), int(h * 0.92)),  # label / lower left
    ]

    work = im.copy()
    for box in zones:
        x0, y0, x1, y1 = box
        # Sample surrounding fabric for fill
        sample = im.crop(
            (
                max(0, x0 - 20),
                max(0, y0 - 20),
                min(w, x1 + 20),
                min(h, y1 + 20),
            )
        ).resize((1, 1), Image.Resampling.BOX)
        color = sample.getpixel((0, 0))
        patch = Image.new("RGBA", (x1 - x0, y1 - y0), color)
        patch = patch.filter(ImageFilter.GaussianBlur(radius=1))
        # Soft edge mask
        mask = Image.new("L", patch.size, 0)
        draw = ImageDraw.Draw(mask)
        draw.ellipse([2, 2, patch.size[0] - 2, patch.size[1] - 2], fill=220)
        mask = mask.filter(ImageFilter.GaussianBlur(radius=6))
        work.paste(patch, (x0, y0), mask)

    # Place small fist on left chest
    mw, mh = mark.size
    target_w = max(36, int(w * 0.07))
    scaled = mark.resize((target_w, int(target_w * mh / mw)), Image.Resampling.LANCZOS)
    px = int(w * 0.58)
    py = int(h * 0.32)
    # Keep on canvas
    px = min(px, w - scaled.size[0] - 8)
    py = min(py, h - scaled.size[1] - 8)
    work.alpha_composite(scaled, (px, py))

    if path.suffix.lower() in {".jpg", ".jpeg"}:
        rgb = Image.new("RGB", work.size, (10, 10, 10))
        rgb.paste(work, mask=work.split()[-1])
        rgb.save(path, quality=92, optimize=True)
    else:
        work.save(path)


def main() -> None:
    logo = Image.open(LOGO).convert("RGBA")
    mark = fist_mark(logo, 256)
    mark.save("public/images/brand/fist-mark.png")
    n = 0
    for folder in (PRODUCTS, MEALS):
        if not folder.exists():
            continue
        for path in sorted(folder.glob("*")):
            if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            try:
                cover_and_brand(path, mark)
                n += 1
            except Exception as exc:
                print("fail", path, exc)
    print("rebranded images:", n)


if __name__ == "__main__":
    main()
