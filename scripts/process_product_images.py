"""Normalize product images + create gallery variants (angle/closeup/flatlay treatments)."""
from __future__ import annotations
from pathlib import Path
import numpy as np
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path("public/images/products")
SIZE = 1200

def studio_normalize(img: Image.Image) -> Image.Image:
    img = img.convert("RGB")
    # Center-crop to square then resize
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side)).resize((SIZE, SIZE), Image.Resampling.LANCZOS)
    # Keep full color — never desaturate photography
    img = ImageEnhance.Contrast(img).enhance(1.04)
    arr = np.array(img).astype(np.float32)
    yy, xx = np.mgrid[0:SIZE, 0:SIZE]
    cx = cy = SIZE / 2
    r = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    vignette = 1 - np.clip((r - SIZE * 0.35) / (SIZE * 0.55), 0, 1) * 0.28
    arr *= vignette[..., None]
    # Soft bottom shadow plane feel
    bottom = np.linspace(1, 0.88, SIZE)[:, None]
    arr *= bottom
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))

def variant(img: Image.Image, kind: str) -> Image.Image:
    w, h = img.size
    if kind == "angle":
        crop = img.crop((int(w*0.08), int(h*0.05), int(w*0.95), int(h*0.92)))
        out = crop.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        out = ImageEnhance.Brightness(out).enhance(0.92)
    elif kind == "side":
        crop = img.crop((int(w*0.18), int(h*0.08), int(w*0.98), int(h*0.95)))
        out = crop.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        out = ImageEnhance.Contrast(out).enhance(1.08)
    elif kind == "closeup":
        crop = img.crop((int(w*0.22), int(w*0.22), int(w*0.78), int(h*0.78)))
        out = crop.resize((SIZE, SIZE), Image.Resampling.LANCZOS)
        out = ImageEnhance.Sharpness(out).enhance(1.2)
    else:  # flatlay / lifestyle product-only darker
        out = ImageEnhance.Brightness(img).enhance(0.92)
    return out

def main():
    heroes = sorted(ROOT.glob("*.jpg"))
    heroes = [p for p in heroes if "-gallery-" not in p.name and "-base" not in p.name]
    print(f"Processing {len(heroes)} heroes")
    for path in heroes:
        try:
            raw = Image.open(path)
            hero = studio_normalize(raw)
            hero.save(path, quality=92, optimize=True)
            stem = path.stem
            for i, kind in enumerate(("angle", "side", "closeup", "flatlay"), start=1):
                out = variant(hero, kind)
                out.save(ROOT / f"{stem}-gallery-{i}.jpg", quality=90, optimize=True)
        except Exception as e:
            print("fail", path, e)
    print("done")

if __name__ == "__main__":
    main()
