import os
import re

dir_path = r"c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components"

files = [
    "FasalSupportProcessInfographic.tsx",
    "FasalSupportImpactInfographic.tsx",
    "FasalIotProcessInfographic.tsx",
    "FasalIotImpactInfographic.tsx",
    "FasalIotFieldMetrics.tsx",
    "FasalFieldMetrics.tsx",
    "FasalFeedbackInfographic.tsx",
    "FasalIotFeedbackInfographic.tsx",
    "FasalIntroInfographic.tsx",
    "FasalInsightsInfographic.tsx",
    "FasalBillingDataFindings.tsx",
    "FasalFarmersInfographic.tsx",
    "FasalDesignOptions.tsx",
    "FasalAudioTicketingInfographic.tsx"
]

brutalist_class = "w-12 h-12 border border-[var(--grid-line)] flex items-center justify-center bg-background shadow-[4px_4px_0px_0px_var(--grid-line)] group-hover:shadow-[6px_6px_0px_0px_var(--foreground)] group-hover:border-[var(--foreground)] transition-all duration-500 shrink-0 group-hover:-translate-y-1 group-hover:-translate-x-1 opacity-80 group-hover:opacity-100"

for file_name in files:
    file_path = os.path.join(dir_path, file_name)
    if not os.path.exists(file_path):
        continue
        
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Strip ALL color classes like `text-blue-500`, `text-amber-500`, etc.
    # also strip `transition-colors duration-500 group-hover:text-[var(--foreground)]` as it's unneeded
    content = re.sub(r'\btext-(?:blue|amber|purple|emerald|red|rose|indigo|orange|green|yellow|teal|cyan|sky)-[0-9]{3}\b', '', content)
    content = re.sub(r' transition-colors duration-500 group-hover:text-\[var\(--foreground\)\]', '', content)
    
    # ensure multiple spaces don't remain in className strings
    content = re.sub(r' +', ' ', content)
    content = re.sub(r' "', '"', content)
    content = re.sub(r'" ', '"', content)
    
    # 2. Fix the p-2 container in ProcessInfographics to Brutalist
    content = re.sub(
        r'<div className="p-2 border border-\[var\(--grid-line\)\]">',
        f'<div className="{brutalist_class}">',
        content
    )
    content = re.sub(
        r'<div className="p-2 border border-\[var\(--grid-line\)\] w-fit text-neutral-500 bg-background">',
        f'<div className="{brutalist_class}">',
        content
    )

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {file_name}")

