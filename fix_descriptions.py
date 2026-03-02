import os, glob, re

# The user wants descriptions to be grey (text-neutral-500 dark:text-neutral-400)
# except where they are on colored backgrounds.
# Standard grid/infographic components for Fasal User Research case study.

target_list = [
    'FasalIntroInfographic.tsx',
    'FasalResearchGoalsInfographic.tsx',
    'FasalInsightsInfographic.tsx',
    'FasalFarmersInfographic.tsx',
    'FasalScriptInfographic.tsx',
    'FasalCardSorting.tsx',
    'FasalConclusionGrid.tsx',
    'ProjectDetailClient.tsx',
    'FasalRequirementsGrid.tsx',
    'FasalFieldMetrics.tsx',
    'FasalGoalsGrid.tsx',
    'FasalDesignOptions.tsx'
]

dir_path = r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components'

for filename in target_list:
    full_path = os.path.join(dir_path, filename)
    if not os.path.exists(full_path):
        continue
        
    with open(full_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Replace common description patterns with consistent grey
    # Handle text-neutral-500 dark:text-neutral-200 or 300
    content = re.sub(r'text-neutral-500 dark:text-neutral-[23]00', 'text-neutral-500 dark:text-neutral-400', content)
    content = re.sub(r'text-neutral-500 dark:text-neutral-200', 'text-neutral-500 dark:text-neutral-400', content)
    
    # Specifically check for any text-[var(--foreground)] in paragraphs that aren't font-bold
    if filename != 'FasalThemesAccordion.tsx':
        # This replaces text-[var(--foreground)] with neutral grey if it's inside a className of a <p> tag
        # We look for the className pattern and replace the specific color class
        def repl(m):
            tag_start = m.group(1)
            classes = m.group(2)
            tag_end = m.group(3)
            
            # If it's bold, we might want to keep it black, but usually paragraphs aren't full-bold
            if 'font-bold' in classes or 'font-medium' in classes:
                return m.group(0)
            
            new_classes = classes.replace('text-[var(--foreground)]', 'text-neutral-500 dark:text-neutral-400')
            return f'{tag_start}{new_classes}{tag_end}'

        content = re.sub(r'(<p[^>]*className=")([^"]*)(".*?>)', repl, content)
        content = re.sub(r'(<li[^>]*className=")([^"]*)(".*?>)', repl, content)
        content = re.sub(r'(<div[^>]*className=")([^"]*)(?:[^"]*?(?:leading-relaxed|font-light)[^"]*?)(".*?>)', repl, content)

    if content != original:
        with open(full_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Cleaned up {filename}')
