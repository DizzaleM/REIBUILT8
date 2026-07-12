from pathlib import Path
import re

checked = set()
missing = []
for p in Path("src").rglob("*.ts*"):
    text = p.read_text(encoding="utf-8")
    for m in re.findall(r'["\']/images/[^"\']+', text):
        path = m[1:]
        if path in checked:
            continue
        checked.add(path)
        fs = Path("public") / path.lstrip("/")
        if not fs.exists():
            missing.append((str(p), path))

print("checked", len(checked))
print("missing", len(missing))
for item in missing:
    print(item)

for name in [
    "build-strength",
    "fat-loss",
    "athletic-performance",
    "home-training",
    "mobility",
    "challenge",
]:
    print("prog", name, (Path("public/images/programs") / f"{name}.jpg").exists())

for name in [
    "boxing-fundamentals",
    "heavy-bag",
    "kickboxing",
    "pad-work",
    "fight-conditioning",
    "speed-footwork",
    "youth-boxing",
    "womens-defense",
    "shadowboxing",
    "power-punch",
]:
    print("combat", name, (Path("public/images/combat") / f"{name}.jpg").exists())
