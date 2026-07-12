from pathlib import Path

for path in (Path("src/data/products.ts"), Path("src/data/meals.ts")):
    text = path.read_text(encoding="utf-8")
    text = text.replace("?v=dw2", "?v=dw3")
    if "?v=dw3" not in text:
        text = text.replace('.jpg"', '.jpg?v=dw3"')
    path.write_text(text, encoding="utf-8")
    print(path, "updated")
