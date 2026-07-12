"""One-shot historical rebrand helper (already applied). Kept for reference only."""

# This script was used to migrate copy from the previous brand to DIESEL WAY.
# Do not re-run against a clean tree without review.

from pathlib import Path

ROOT = Path(".")
INCLUDE_DIRS = ["src", "public"]
INCLUDE_FILES = ["README.md", "CONTENT-NEEDED.md", "IMAGE-SOURCES.md", "PROGRAM-IMAGE-MAPPING.md"]
EXTS = {".ts", ".tsx", ".js", ".jsx", ".css", ".md", ".json", ".html", ".svg"}

REPLACEMENTS = [
    ("OLD_BRAND", "DIESEL WAY"),
]


def main() -> None:
    print("Historical script — no-op. Rebrand already applied.")


if __name__ == "__main__":
    main()
