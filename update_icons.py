import os
import re

dir_path = r"c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components"

# The standard brutalist wrapper replacement
# Looking for simple icon wrappers that are usually something like:
# <div className="w-10 h-10 border border-[var(--grid-line)] flex items-center justify-center text-...">
# or <div className="p-2 border border-[var(--grid-line)] ...">

# Let's write rules for common files

files = [
    "FasalSupportHeroInfographic.tsx",
    "FasalSupportProcessInfographic.tsx",
    "FasalSupportImpactInfographic.tsx",
    "FasalIotProcessInfographic.tsx",
    "FasalIotImpactInfographic.tsx",
    "FasalIotFieldMetrics.tsx",
    "FasalFieldMetrics.tsx",
    "FasalFeedbackInfographic.tsx",
    "FasalIotFeedbackInfographic.tsx",
    "FasalIntroInfographic.tsx",
    "FasalInsightsInfographic.tsx"
]

brutalist_class = "w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100"

def process_file(file_name):
    file_path = os.path.join(dir_path, file_name)
    if not os.path.exists(file_path):
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Needs a group container on the parent panel usually.
    # We will search for border-b containers and add `group relative` if missing
    
    # 1. Update basic round/square containers
    content = re.sub(
        r'<div className="w-10 h-10 border border-\[var\(--grid-line\)\] flex items-center justify-center[^"]*">',
        f'<div className="{brutalist_class}">',
        content
    )
    
    content = re.sub(
        r'<div className="w-12 h-12 rounded-full border border-\[var\(--grid-line\)\] flex items-center justify-center[^"]*">',
        f'<div className="{brutalist_class}">',
        content
    )
    content = re.sub(
        r'<div className="w-12 h-12 rounded-full bg-[^"]* flex items-center justify-center border border-\[var\(--grid-line\)\]">',
        f'<div className="{brutalist_class}">',
        content
    )

    # Make Sure Icons animate color
    content = re.sub(
        r'(<[A-Z][A-Za-z0-9]* className="w-[56] h-[56] text-[^"]*)(" />)',
        r'\1 transition-colors duration-500 group-hover:text-[var(--foreground)]\2',
        content
    )
    
    # Ensure parents have group class for hover to work
    # Many of these are inside `<div className="p-8 ... border-..." ...`
    # or `<div className="... hover:bg-...`
    content = re.sub(
        r'(className="[^"]*p-8[^"]*hover:bg-[^"]*)(")',
        r'\1 group relative\2',
        content
    )
    # Also for those that don't have hover:bg yet in hero panels
    content = re.sub(
        r'(<div className="p-8(?: space-y-6)?(?: border-[^"]*)?)\s*(">)',
        r'\1 hover:bg-[var(--grid-line)]/5 transition-colors duration-500 group relative\2',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_name}")

for f in files:
    process_file(f)
