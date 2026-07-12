from pathlib import Path
import re

# Programs
text = Path("src/data/programs.ts").read_text(encoding="utf-8")
replacements = {
    'image: "/images/rei/program-strength.jpg"': 'image: "/images/programs/build-strength.jpg",\n    imageAlt: "Rei locking out a heavy deadlift in the gym",',
    'image: "/images/rei/program-fat-loss.jpg"': 'image: "/images/programs/fat-loss.jpg",\n    imageAlt: "Athlete training with focused conditioning intensity",',
    'image: "/images/rei/program-athletic.jpg"': 'image: "/images/programs/athletic-performance.jpg",\n    imageAlt: "Rei showing a strong back pose after training",',
    'image: "/images/rei/program-home.jpg"': 'image: "/images/programs/home-training.jpg",\n    imageAlt: "Athlete performing a bodyweight training movement",',
    'image: "/images/rei/workout-preview-1.jpg"': 'image: "/images/programs/mobility.jpg",\n    imageAlt: "Athlete stretching during a mobility session",',
    'image: "/images/rei/workout-preview-2.jpg"': 'image: "/images/programs/challenge.jpg",\n    imageAlt: "Athlete training during a consistency challenge workout",',
}
for a, b in replacements.items():
    if a in text:
        text = text.replace(a, b, 1)
        print("program ok", a.split("/")[-1])
    else:
        print("program miss", a)
Path("src/data/programs.ts").write_text(text, encoding="utf-8")

# Products
text = Path("src/data/products.ts").read_text(encoding="utf-8")
pairs = [
    ("performance-hoodie", "/images/products/r8-hoodie.jpg"),
    ("r8-training-tee", "/images/products/r8-training-shirt.jpg"),
    ("r8-performance-shorts", "/images/products/r8-shorts.jpg"),
    ("r8-snapback", "/images/products/r8-hat.jpg"),
    ("r8-shaker", "/images/products/r8-shaker.jpg"),
    ("resistance-band-set", "/images/products/r8-resistance-bands.jpg"),
    ("training-journal", "/images/products/r8-journal.jpg"),
    ("digital-strength-program", "/images/programs/build-strength.jpg"),
    ("digital-fat-loss-program", "/images/programs/fat-loss.jpg"),
    ("gift-card", "/images/products/r8-hoodie.jpg"),
    ("whey-protein", "/images/products/r8-supplement.jpg"),
    ("creatine", "/images/products/r8-supplement.jpg"),
    ("pre-workout", "/images/products/r8-supplement.jpg"),
    ("electrolyte-mix", "/images/products/r8-shaker.jpg"),
]
for slug, img in pairs:
    pattern = rf'(slug: "{slug}",[\s\S]*?image: ")[^"]+(")'
    text2, n = re.subn(pattern, rf"\g<1>{img}\2", text, count=1)
    print(("product ok" if n else "product miss"), slug)
    text = text2
Path("src/data/products.ts").write_text(text, encoding="utf-8")
print("done")
