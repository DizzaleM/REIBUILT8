"""Prefix Diesel product names and scrub r8 slugs."""

from pathlib import Path

path = Path("src/data/products.ts")
text = path.read_text(encoding="utf-8")

# Fix legacy slugs
text = text.replace('slug: "r8-training-tee"', 'slug: "diesel-training-tee"')
text = text.replace('slug: "r8-performance-shorts"', 'slug: "diesel-performance-shorts"')
text = text.replace('slug: "r8-snapback"', 'slug: "diesel-snapback"')

# Rename map for display names
renames = {
    'name: "Performance Hoodie"': 'name: "Diesel Performance Hoodie"',
    'name: "Training Hoodie"': 'name: "Diesel Heavyweight Hoodie"',
    'name: "Performance Tee"': 'name: "Diesel Training Tee"',
    'name: "Oversized Tee"': 'name: "Diesel Oversized Tee"',
    'name: "Compression Shirt"': 'name: "Diesel Compression Shirt"',
    'name: "Long Sleeve Training Shirt"': 'name: "Diesel Long Sleeve Tee"',
    'name: "Tank Top"': 'name: "Diesel Training Tank"',
    'name: "Performance Shorts"': 'name: "Diesel Performance Shorts"',
    'name: "Joggers"': 'name: "Diesel Training Joggers"',
    'name: "Compression Leggings"': 'name: "Diesel Compression Leggings"',
    'name: "Training Socks"': 'name: "Diesel Training Socks"',
    'name: "Snapback Hat"': 'name: "Diesel Snapback"',
    'name: "Beanie"': 'name: "Diesel Beanie"',
    'name: "Windbreaker"': 'name: "Diesel Windbreaker"',
    'name: "Duffel Bag"': 'name: "Diesel Gym Bag"',
    'name: "Gym Backpack"': 'name: "Diesel Gym Backpack"',
    'name: "Gym Towel"': 'name: "Diesel Gym Towel"',
    'name: "Shaker Bottle"': 'name: "Diesel Shaker"',
    'name: "Training Journal"': 'name: "Diesel Journal"',
    'name: "Boxing Gloves"': 'name: "Diesel Elite Gloves"',
    'name: "Heavy Bag"': 'name: "Diesel Heavy Bag"',
    'name: "Resistance Bands"': 'name: "Diesel Resistance Bands"',
    'name: "Recovery Roller"': 'name: "Diesel Recovery Roller"',
    'name: "Foam Roller"': 'name: "Diesel Recovery Roller"',
    'name: "Whey Protein"': 'name: "Diesel Protein"',
    'name: "Creatine Monohydrate"': 'name: "Diesel Creatine"',
    'name: "Pre-Workout"': 'name: "Diesel Pre Workout"',
    'name: "Pre Workout"': 'name: "Diesel Pre Workout"',
    'name: "Electrolytes"': 'name: "Diesel Electrolytes"',
    'name: "Hand Wraps"': 'name: "Diesel Hand Wraps"',
    'name: "Jump Rope"': 'name: "Diesel Jump Rope"',
    'name: "Water Bottle"': 'name: "Diesel Water Bottle"',
    'name: "Cap"': 'name: "Diesel Cap"',
}

for old, new in renames.items():
    text = text.replace(old, new)

path.write_text(text, encoding="utf-8")
print("products updated")
