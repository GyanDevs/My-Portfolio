import os, re

# Sync grey font colors for ALL components in the directory
# Standardizing descriptions to text-neutral-500 dark:text-neutral-400
# EXCEPT where they are on colored backgrounds (handled manually or by skip)

dir_path = r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components'

# These are the ones where we WANT high contrast because they sit on colors
high_contrast_components = [
    'FasalThemesAccordion.tsx',
    'FasalFarmerObservations.tsx',
    'FasalIotFeedbackInfographic.tsx' # Just fixed this one
]

for filename in os.listdir(dir_path):
    if not filename.endswith('.tsx'):
        continue
        
    full_path = os.path.join(dir_path, filename)
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Standardize dark mode neutrals to 400 for descriptions
    content = content.replace('dark:text-neutral-200', 'dark:text-neutral-400')
    content = content.replace('dark:text-neutral-300', 'dark:text-neutral-400')
    
    # Ensure text-neutral-500 has dark:text-neutral-400 pairing
    def add_dark(m):
        c = m.group(0)
        if 'dark:' not in c:
            return c.replace('text-neutral-500', 'text-neutral-500 dark:text-neutral-400')
        return c

    content = re.sub(r'className="[^"]*text-neutral-500[^"]*"', add_dark, content)

    # For components NOT in the high-contrast list, ensure descriptions use grey instead of foreground
    if filename not in high_contrast_components:
        def repl_fg(m):
            tag_start = m.group(1)
            classes = m.group(2)
            tag_end = m.group(3)
            
            # Skip if it's potentially a heading or explicitly bolded
            if any(h in classes for h in ['font-bold', 'font-black', 'text-xl', 'text-2xl', 'text-3xl']):
                return m.group(0)
            
            new_classes = classes.replace('text-[var(--foreground)]', 'text-neutral-500 dark:text-neutral-400')
            return f'{tag_start}{new_classes}{tag_end}'

        content = re.sub(r'(<(?:p|li|span)[^>]*className=")([^"]*text-\[var\(--foreground\)\][^"]*)(".*?>)', repl_fg, content)

    if content != original:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Synced {filename}')
