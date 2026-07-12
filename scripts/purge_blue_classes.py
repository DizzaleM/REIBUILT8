"""Replace residual blue-named utility classes with monochrome equivalents."""

from pathlib import Path

ROOT = Path("src")

REPLACEMENTS = [
    ("text-r8-blue-light", "text-r8-secondary"),
    ("hover:text-r8-blue-light", "hover:text-white"),
    ("fill-r8-blue", "fill-white"),
    ("text-r8-blue", "text-white"),
    ("border-r8-blue/50", "border-white/40"),
    ("border-r8-blue/40", "border-white/35"),
    ("border-r8-blue/30", "border-white/30"),
    ("hover:border-r8-blue/60", "hover:border-white/50"),
    ("hover:border-r8-blue/50", "hover:border-white/40"),
    ("hover:border-r8-blue/40", "hover:border-white/35"),
    ("hover:border-r8-blue", "hover:border-white/50"),
    ("border-r8-blue", "border-white"),
    ("bg-r8-blue/20", "bg-white/10"),
    ("bg-r8-blue/15", "bg-white/10"),
    ("bg-r8-blue/10", "bg-white/5"),
    ("hover:bg-r8-blue/10", "hover:bg-white/5"),
    ("bg-r8-blue", "bg-white"),
    ("accent-r8-blue", "accent-white"),
]


def main() -> None:
    n = 0
    for path in ROOT.rglob("*"):
        if path.suffix.lower() not in {".ts", ".tsx", ".css"}:
            continue
        raw = path.read_text(encoding="utf-8")
        updated = raw
        for old, new in REPLACEMENTS:
            updated = updated.replace(old, new)
        if updated != raw:
            path.write_text(updated, encoding="utf-8")
            n += 1
            print("updated", path)
    print("files", n)


if __name__ == "__main__":
    main()
