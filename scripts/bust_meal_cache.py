from pathlib import Path

p = Path("src/data/meals.ts")
t = p.read_text(encoding="utf-8")
t = t.replace('.jpg"', '.jpg?v=dw2"')
p.write_text(t, encoding="utf-8")
print("meals updated")
