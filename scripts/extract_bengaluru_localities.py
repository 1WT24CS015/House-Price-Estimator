import csv
import json
from pathlib import Path

inp = Path('data/train.csv')
out_json = Path('data/bengaluru_localities.json')
out_txt = Path('data/bengaluru_localities.txt')

localities = set()
if not inp.exists():
    raise SystemExit(f"Input file not found: {inp}")

with inp.open(newline='', encoding='utf-8') as fh:
    reader = csv.reader(fh)
    header = next(reader, None)
    for row in reader:
        # ADDRESS is the 9th column (index 8)
        if len(row) < 9:
            continue
        address = row[8].strip()
        if not address:
            continue
        a = address.lower()
        # include only rows where city is Bangalore/Bengaluru
        if 'bangalore' in a or 'bengaluru' in a:
            # take the part before the last comma if there are multiple parts
            # often format is "Locality,City"
            parts = [p.strip() for p in address.split(',')]
            if len(parts) >= 2:
                locality = ','.join(parts[:-1]).strip()
            else:
                locality = address.strip()
            # normalize spacing and capitalization
            locality_norm = ' '.join(locality.split())
            localities.add(locality_norm)

# produce a sorted deterministic list
sorted_localities = sorted(localities, key=lambda s: s.lower())

out_json.write_text(json.dumps(sorted_localities, ensure_ascii=False, indent=2), encoding='utf-8')
out_txt.write_text('\n'.join(sorted_localities), encoding='utf-8')
print(f'Wrote {len(sorted_localities)} localities to {out_json} and {out_txt}')
