"""Replace electric-blue rgba glow literals with monochrome silver/white."""

from pathlib import Path

ROOT = Path("src")
REPLACEMENTS = [
    ("rgba(10,132,255,", "rgba(255,255,255,"),
    ("rgba(10, 132, 255,", "rgba(255, 255, 255,"),
    ("rgba(0,81,204,", "rgba(192,192,192,"),
    ("rgba(0, 81, 204,", "rgba(192, 192, 192,"),
    ("rgba(8,107,255,", "rgba(255,255,255,"),
    ("rgba(8, 107, 255,", "rgba(255, 255, 255,"),
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
    print("files:", n)


if __name__ == "__main__":
    main()
