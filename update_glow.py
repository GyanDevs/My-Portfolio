import os
import re

directory = r"c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components"

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = re.sub(r'hover:bg-neutral-50\b(?:/50|/80)?', 'kinetic-glow', content)
    new_content = re.sub(r'dark:hover:bg-white/5\b', '', new_content)
    new_content = re.sub(r'dark:hover:bg-neutral-900/50\b', '', new_content)
    new_content = re.sub(r'hover:bg-neutral-200/80\b', 'kinetic-glow', new_content)
    new_content = re.sub(r'dark:hover:bg-neutral-800/50\b', '', new_content)
    
    # Cleanup extra spaces
    new_content = re.sub(r'\s{2,}', ' ', new_content)
    new_content = new_content.replace(' kinetic-glow', ' kinetic-glow')

    if content != new_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {os.path.basename(filepath)}")

for root, _, files in os.walk(directory):
    for f in files:
        if f.endswith('.tsx') and f not in ["ProjectCard.tsx"]:
            process_file(os.path.join(root, f))
