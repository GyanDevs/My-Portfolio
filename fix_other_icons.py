import os
import re

dir_path = r"c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components"

files = [
    "FasalScriptInfographic.tsx",
    "FasalResearchGoalsInfographic.tsx",
    "FasalIotFeedbackInfographic.tsx",
    "FasalInsightsInfographic.tsx",
    "FasalFeedbackInfographic.tsx",
    "FasalFarmersInfographic.tsx"
]

brutalist_class = "w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100"

for file_name in files:
    file_path = os.path.join(dir_path, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace specific p-3 wrappers
    content = re.sub(
        r'<div className="p-3 border border-\[var\(--grid-line\)\] rounded-none hidden md:block shrink-0">',
        f'<div className="{brutalist_class} hidden md:flex">',
        content
    )
    content = re.sub(
        r'<div className="p-3 border border-\[var\(--grid-line\)\] rounded-none hidden md:block">',
        f'<div className="{brutalist_class} hidden md:flex">',
        content
    )
    content = re.sub(
        r'<div className="p-3 border border-\[var\(--grid-line\)\] bg-background">',
        f'<div className="{brutalist_class}">',
        content
    )
    
    # Assign group hover context
    content = content.replace('<div className="flex items-center gap-4 border-b', '<div className="flex items-center gap-4 group relative border-b')
    content = content.replace('<div className="flex flex-col md:flex-row items-start md:items-center gap-6">', '<div className="flex flex-col md:flex-row items-start md:items-center gap-6 group relative">')
    
    # specific to FasalFeedbackInfographic & FasalIotFeedbackInfographic header sections
    content = content.replace('<div className="flex items-center gap-4">\n <div className="w-12 h-12', '<div className="flex items-center gap-4 group cursor-default">\n <div className="w-12 h-12')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print(f"Updated {file_name}")
