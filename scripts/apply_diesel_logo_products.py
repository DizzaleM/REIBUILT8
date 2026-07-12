"""Rebuild transparent Diesel Way stamps and apply cleanly to product/meal photos."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

PRODUCTS = Path("public/images/products")
MEALS = Path("public/images/meals")
MASTER = Path("public/brand/the-diesel-way-logo-approved.png")
OUT_WHITE = Path("public/images/brand/diesel-way-logo-white.png")
OUT_CHEST = Path("public/images/brand/diesel-way-chest-mark.png")


def to_white_transparent(src: Image.Image) -> Image.Image:
    im = src.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            brightness = (r + g + b) / 3.0
            # Aggressive: anything near black becomes fully transparent
            if brightness < 55:
                px[x, y] = (0, 0, 0, 0)
            elif brightness < 110:
                # Mid gray (D outline / tagline) -> soft silver
                v = int(180 + (brightness - 55) * 1.2)
                alpha = int(90 + (brightness - 55) * 2.0)
                px[x, y] = (min(255, v), min(255, v), min(255, v), min(255, alpha))
            else:
                px[x, y] = (255, 255, 255, 255)
    return im


def trim_alpha(im: Image.Image, pad: int = 6) -> Image.Image:
    bbox = im.getbbox()
    if not bbox:
        return im
    x0, y0, x1, y1 = bbox
    return im.crop(
        (
            max(0, x0 - pad),
            max(0, y0 - pad),
            min(im.size[0], x1 + pad),
            min(im.size[1], y1 + pad),
        )
    )


def fabric_heal(work: Image.Image, box: tuple[int, int, int, int], base: Image.Image) -> None:
    """Clone nearby fabric into a soft ellipse — no hard rectangles."""
    x0, y0, x1, y1 = box
    w, h = work.size
    x0, y0 = max(0, x0), max(0, y0)
    x1, y1 = min(w, x1), min(h, y1)
    bw, bh = x1 - x0, y1 - y0
    if bw < 8 or bh < 8:
        return

    # Prefer sampling from left of the zone (usually clean fabric)
    sx0 = max(0, x0 - bw - 10)
    sx1 = max(sx0 + 8, x0 - 4)
    sy0 = max(0, y0 - 8)
    sy1 = min(h, y1 + 8)
    if sx1 - sx0 < 8:
        sx0 = min(w - 8, x1 + 4)
        sx1 = min(w, sx0 + bw)
    sample = base.crop((sx0, sy0, sx1, sy1)).resize((bw, bh), Image.Resampling.BICUBIC)
    sample = sample.filter(ImageFilter.GaussianBlur(radius=10))

    mask = Image.new("L", (bw, bh), 0)
    draw = ImageDraw.Draw(mask)
    draw.ellipse([2, 2, bw - 3, bh - 3], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=max(6, min(bw, bh) // 8)))
    work.paste(sample, (x0, y0), mask)


def place_mark(work: Image.Image, mark: Image.Image, cx: float, cy: float, scale: float) -> None:
    w, h = work.size
    mw = max(72, int(w * scale))
    mh = int(mw * (mark.size[1] / mark.size[0]))
    scaled = mark.resize((mw, mh), Image.Resampling.LANCZOS)
    # Ensure no residual dark fringe
    px = scaled.load()
    for y in range(mh):
        for x in range(mw):
            r, g, b, a = px[x, y]
            if a < 18 or (r + g + b) / 3 < 40:
                px[x, y] = (0, 0, 0, 0)
    x = int(w * cx - mw / 2)
    y = int(h * cy - mh / 2)
    x = max(4, min(x, w - mw - 4))
    y = max(4, min(y, h - mh - 4))
    work.alpha_composite(scaled, (x, y))


def classify(name: str) -> str:
    n = name.lower()
    if any(
        k in n
        for k in (
            "protein",
            "creatine",
            "pre-workout",
            "preworkout",
            "electrolyte",
            "greens",
            "recovery",
            "shaker",
            "bottle",
            "whey",
            "isolate",
        )
    ):
        return "label"
    if any(
        k in n
        for k in (
            "chicken",
            "steak",
            "salmon",
            "turkey",
            "egg",
            "oat",
            "pasta",
            "burrito",
            "pancake",
            "bowl",
            "alfredo",
            "teriyaki",
            "meal",
        )
    ):
        return "meal"
    return "apparel"


def process(path: Path, full: Image.Image, chest: Image.Image) -> None:
    base = Image.open(path).convert("RGBA")
    work = base.copy()
    w, h = work.size
    kind = classify(path.name)

    # Heal prior stamp / black-box artifacts
    for box in (
        (int(w * 0.40), int(h * 0.18), int(w * 0.86), int(h * 0.55)),
        (int(w * 0.22), int(h * 0.20), int(w * 0.78), int(h * 0.58)),
        (int(w * 0.02), int(h * 0.70), int(w * 0.42), int(h * 0.98)),
        (int(w * 0.55), int(h * 0.70), int(w * 0.98), int(h * 0.98)),
    ):
        fabric_heal(work, box, base)

    if kind == "label":
        place_mark(work, full, cx=0.50, cy=0.40, scale=0.36)
    elif kind == "meal":
        place_mark(work, chest, cx=0.50, cy=0.26, scale=0.30)
    else:
        # Readable chest lockup — not tiny fist
        place_mark(work, chest, cx=0.56, cy=0.33, scale=0.28)

    if path.suffix.lower() in {".jpg", ".jpeg"}:
        rgb = Image.new("RGB", work.size, (8, 8, 8))
        rgb.paste(work, mask=work.split()[-1])
        rgb.save(path, quality=93, optimize=True)
    else:
        work.save(path)


def main() -> None:
    master = Image.open(MASTER).convert("RGBA")
    white = trim_alpha(to_white_transparent(master))
    # Force any remaining near-black pixels transparent again after trim
    white = to_white_transparent(white)
    white = trim_alpha(white)
    white.save(OUT_WHITE)

    cw, ch = white.size
    chest = trim_alpha(white.crop((0, 0, cw, int(ch * 0.86))))
    chest = ImageEnhance.Contrast(chest).enhance(1.1)
    chest.save(OUT_CHEST)

    # Sanity: ensure alpha exists
    assert chest.mode == "RGBA"
    alphas = [a for *_, a in chest.getdata()]
    print("chest transparent px ratio:", round(alphas.count(0) / max(1, len(alphas)), 3))

    n = 0
    for folder in (PRODUCTS, MEALS):
        if not folder.exists():
            continue
        for path in sorted(folder.glob("*")):
            if path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
                continue
            try:
                process(path, white, chest)
                n += 1
            except Exception as exc:
                print("fail", path.name, exc)
    print("branded", n)


if __name__ == "__main__":
    main()
