import os, glob, re

target_dir = r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components'
files = glob.glob(os.path.join(target_dir, '*.tsx')) + glob.glob(os.path.join(r'c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\app', '**', '*.tsx'), recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    
    # regex to find class attributes that contain text-[18px] or text-lg
    # and don't contain font-bold or text-[var(--foreground)]
    def repl_cleanup(m):
        full = m.group(0)
        # Skip if it is a heading or highlighted text
        if 'font-bold' in full or 'font-medium' in full or 'text-[var(--foreground)]' in full:
            return full
            
        # replace 18px with 16px
        res = re.sub(r'text-\[18px\]', r'text-[16px]', full)
        res = re.sub(r'text-lg\b', r'text-[16px]', res)
        # replace any text-neutral-[4678]00 with 500
        res = re.sub(r'text-neutral-[4678]00', r'text-neutral-500', res)
        
        # If no text-neutral-500 is in the string and it's not containing another color text-, add it
        # Actually it's easier to just append text-neutral-500 if there's no text-neutral in it yet
        if 'text-neutral' not in res:
            res = res[:-1] + ' text-neutral-500"' # assuming it ends with a quote
            
        return res

    content = re.sub(r'className="[^"]*?(?:text-\[18px\]|text-lg\b)[^"]*?"', repl_cleanup, content)
    
    # Some standalone `<div className="flex-1 whitespace-pre-line text-[18px]">` 
    # needs to be text-16px and text-neutral-500
    
    # Also handle single quotes if any
    content = re.sub(r"className='[^']*?(?:text-\[18px\]|text-lg\b)[^']*?'", repl_cleanup, content)
    
    if content != original:
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print('Updated text-[18px]/text-lg descriptions:', file)
