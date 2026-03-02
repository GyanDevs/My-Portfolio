import os, glob, re

target_dir = r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components'
files = glob.glob(os.path.join(target_dir, '*.tsx')) + glob.glob(os.path.join(r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\app', '**', '*.tsx'), recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # Target remaining text-[18px] descriptions or text-lg that are not headings
    def force_desc_formatting(m):
        full = m.group(0)
        # Check if the class contains font-bold or text-[var(--foreground)]
        # If it does, we probably want to leave it alone
        if 'font-bold' in full or 'font-medium' in full:
            return full
        
        # for these specific paragraph-like tags, replace 18 with 16 and add neutral-500
        res = re.sub(r'text-\[18px\]', r'text-[16px]', full)
        res = re.sub(r'text-lg\b', r'text-[16px]', res)
        # Handle colors
        res = re.sub(r'text-neutral-[4678]00', r'text-neutral-500', res)
        if 'text-[var(--foreground)]' not in res and 'text-neutral-500' not in res:
            res = res[:-1] + ' text-neutral-500"'
        
        return res

    # Re-apply to <p ... > tags
    content = re.sub(r'<p className="[^"]*?(?:text-\[18px\]|text-lg\b)[^"]*?"', force_desc_formatting, content)
    # Apply to <li> elements
    content = re.sub(r'<li className="[^"]*?(?:text-\[18px\]|text-lg\b)[^"]*?"', force_desc_formatting, content)
    # Apply to <div> elements that have leading-relaxed or font-light (as descriptions)
    content = re.sub(r'<div className="[^"]*?(?:leading-relaxed|font-light)[^"]*?(?:text-\[18px\]|text-lg\b)[^"]*?"', force_desc_formatting, content)
    content = re.sub(r'<div className="[^"]*?(?:text-\[18px\]|text-lg\b)[^"]*?(?:leading-relaxed|font-light)[^"]*?"', force_desc_formatting, content)
    
    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Final cleanup:', file)
