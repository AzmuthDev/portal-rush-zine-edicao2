"""
Extract the ASSET_MAP from index_backup.html and copy local assets
from the halide.aura.build bundle to the assets/ directory.
"""
import re, os, json, base64, shutil

html = open('index_backup.html', 'r', encoding='utf-8').read()

# Find ASSET_MAP
m = re.search(r'var ASSET_MAP = (\{[^}]+\})', html, re.DOTALL)
if not m:
    print("ASSET_MAP not found")
    exit(1)

asset_map = json.loads(m.group(1))
print(f"Found {len(asset_map)} assets in ASSET_MAP")

# Create assets directory
os.makedirs('assets', exist_ok=True)

# Check which assets exist in halide.aura.build/
aura_dir = os.path.join('halide.aura.build')
copied = 0
missing = 0

for url, local_path in asset_map.items():
    # local_path is like "assets/xxx_file.js"
    src = os.path.join(aura_dir, local_path)
    dst = local_path  # already has "assets/" prefix
    
    if os.path.exists(src):
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copy2(src, dst)
        copied += 1
    else:
        missing += 1
        # Print first few missing for debug
        if missing <= 10:
            print(f"  MISSING: {local_path}")

print(f"Copied: {copied}")
print(f"Missing: {missing}")

# List what we have
print("\nAssets directory contents:")
for f in sorted(os.listdir('assets')):
    print(f"  {f} ({os.path.getsize(os.path.join('assets', f)):,} bytes)")
