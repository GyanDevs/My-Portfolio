import os, re

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
    
    # 1. Standardize existing neutral colors to dark:text-neutral-400
    content = content.replace('dark:text-neutral-200', 'dark:text-neutral-400')
    content = content.replace('dark:text-neutral-300', 'dark:text-neutral-400')
    
    # 2. Ensure text-neutral-500 always has dark:text-neutral-400
    # Capture class string and add dark:text-neutral-400 if it's there
    def add_dark_mode(m):
        full_class = m.group(0)
        if 'dark:' not in full_class:
            return full_class.replace('text-neutral-500', 'text-neutral-500 dark:text-neutral-400')
        return full_class

    content = re.sub(r'className="[^"]*text-neutral-500[^"]*"', add_dark_mode, content)

    # 3. Targeted replacement for text-[var(--foreground)] to grey
    # Only for <p> and <li> that are likely descriptions (not bold)
    if filename != 'FasalThemesAccordion.tsx' and filename != 'FasalFarmerObservations.tsx':
        def repl_fg(m):
            tag_start = m.group(1)
            classes = m.group(2)
            tag_end = m.group(3)
            
            # Don't replace if it's a heading-like thing or explicitly bolded
            if 'font-bold' in classes or 'font-black' in classes or 'text-xl' in classes or 'text-2xl' in classes or 'text-3xl' in classes:
                return m.group(0)
            
            # Replace foreground with grey
            new_classes = classes.replace('text-[var(--foreground)]', 'text-neutral-500 dark:text-neutral-400')
            return f'{tag_start}{new_classes}{tag_end}'

        content = re.sub(r'(<(?:p|li|span)[^>]*className=")([^"]*text-\[var\(--foreground\)\][^"]*)(".*?>)', repl_fg, content)

    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Processed {filename}')
