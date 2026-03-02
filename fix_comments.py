import os
import glob

directory = r"c:\Users\Gyan\.gemini\antigravity\scratch\antigravity-portfolio\src\components"

replacements = [
    # Typewriter.tsx
    ("hasAnimatedRef = useRef(false); // Capture whether intro was already done when this component first mounted const wasAlreadyCompleteRef",
     "hasAnimatedRef = useRef(false);\n// Capture whether intro was already done when this component first mounted\nconst wasAlreadyCompleteRef"),
    ("useEffect(() => { // CASE 1: Back-navigation — introComplete was already true at mount. // Show the final state immediately without animating. if (wasAlreadyCompleteRef",
     "useEffect(() => {\n// CASE 1: Back-navigation — introComplete was already true at mount.\n// Show the final state immediately without animating.\nif (wasAlreadyCompleteRef"),
    ("} // eslint-disable-next-line react-hooks/exhaustive-deps }, []);",
     "}\n// eslint-disable-next-line react-hooks/exhaustive-deps\n}, []);"),
    ("useEffect(() => { // CASE 2: Fresh load — wait for introComplete to flip true, then animate. if (!introComplete)",
     "useEffect(() => {\n// CASE 2: Fresh load — wait for introComplete to flip true, then animate.\nif (!introComplete)"),
    ("}; // eslint-disable-next-line react-hooks/exhaustive-deps }, [introComplete]);",
     "};\n// eslint-disable-next-line react-hooks/exhaustive-deps\n}, [introComplete]);"),
    ("))} {/* Render current animating text */} {currentText",
     "))}\n{/* Render current animating text */}\n{currentText"),

    # Testimonials.tsx
    ("const [currentIndex, setCurrentIndex] = useState(0); // State to track items per page for responsive behavior const [itemsPerPage",
     "const [currentIndex, setCurrentIndex] = useState(0);\n// State to track items per page for responsive behavior\nconst [itemsPerPage"),
    ("setItemsPerPage(3); // Update items per page on window resize React.useEffect",
     "setItemsPerPage(3);\n// Update items per page on window resize\nReact.useEffect"),
    ("}; // Initial call handleResize();",
     "};\n// Initial call\nhandleResize();"),
    ("prevSlide = () => { setCurrentIndex((prev) => Math.max(prev - 1, 0)); }; // Ensure currentIndex is valid when itemsPerPage changes React.useEffect",
     "prevSlide = () => { setCurrentIndex((prev) => Math.max(prev - 1, 0)); };\n// Ensure currentIndex is valid when itemsPerPage changes\nReact.useEffect"),
    ("currentIndex}`} // Unique key to trigger animation on index change initial=",
     "currentIndex}`}\n// Unique key to trigger animation on index change\ninitial="),

    # Spotlight.tsx
    ("const mouseY = useMotionValue(0); // Smooth out the mouse movement const smoothX",
     "const mouseY = useMotionValue(0);\n// Smooth out the mouse movement\nconst smoothX"),

    # ProjectDetailClient.tsx
    ("const readingTime = calculateReadingTime(project); // Track scroll progress useEffect",
     "const readingTime = calculateReadingTime(project);\n// Track scroll progress\nuseEffect"),
    ("container.addEventListener('scroll', handleContainerScroll, { passive: true }); // Initial check updateProgress",
     "container.addEventListener('scroll', handleContainerScroll, { passive: true });\n// Initial check\nupdateProgress"),
    ("}, []); // Placeholder for UI screenshots since they don't exist in JSON yet const uiArtifactPath",
     "}, []);\n// Placeholder for UI screenshots since they don't exist in JSON yet\nconst uiArtifactPath"),

    # ImageViewer.tsx
    ("const imgRef = useRef<HTMLImageElement>(null); // For pinch zoom const touchStartDist",
     "const imgRef = useRef<HTMLImageElement>(null);\n// For pinch zoom\nconst touchStartDist"),
    ("handleReset(); }; // Close on Escape useEffect",
     "handleReset(); };\n// Close on Escape\nuseEffect"),
    ("window.removeEventListener('keydown', handleEsc); }, [onClose]); // Prevent body scroll when open useEffect",
     "window.removeEventListener('keydown', handleEsc); }, [onClose]);\n// Prevent body scroll when open\nuseEffect"),
    ("document.body.style.overflow = ''; }; }, [isOpen]); // PAN LOGIC const handleMouseDown",
     "document.body.style.overflow = ''; }; }, [isOpen]);\n// PAN LOGIC\nconst handleMouseDown"),
    ("setIsDragging(false); }, []); // PINCH ZOOM LOGIC const handleTouchStart",
     "setIsDragging(false); }, []);\n// PINCH ZOOM LOGIC\nconst handleTouchStart"),
    ("setIsDragging(true); } }; const handleTouchMove",
     "setIsDragging(true); } };\nconst handleTouchMove"),
    ("scale > 1) { // Simple touch pan could be added here if needed // For now we'll focus on pinch zoom as requested } };",
     "scale > 1) {\n// Simple touch pan could be added here if needed\n// For now we'll focus on pinch zoom as requested\n} };"),

    # FasalThemesAccordion.tsx
    ('import { ChevronDown, ChevronUp } from "lucide-react"; // Data derived from the user request and image',
     'import { ChevronDown, ChevronUp } from "lucide-react";\n// Data derived from the user request and image\n'),
    ('const THEMES = [',
     '\nconst THEMES = ['),
    ("open by default const [openSection, setOpenSection]",
     "open by default\nconst [openSection, setOpenSection]"),
    ("{ // Issue cardTheme",
     "{\n// Issue\ncardTheme"),
    ("} else if (cIdx === 1) { // Solution cardTheme",
     "} else if (cIdx === 1) {\n// Solution\ncardTheme"),
    ("} else if (cIdx === 2) { // Benefit -> Using Orange for better distinction as distinct column, or Green if strictly requested. // User said \"solutions and how they can be useful in green\". // But commonly \"How helpful\" is distinctive. // Let's use the Green theme for BOTH to be safe with \"in green\". cardTheme",
     "} else if (cIdx === 2) {\n// Benefit -> Using Orange for better distinction as distinct column, or Green if strictly requested.\n// User said \"solutions and how they can be useful in green\".\n// But commonly \"How helpful\" is distinctive.\n// Let's use the Green theme for BOTH to be safe with \"in green\".\ncardTheme"),

    # FasalRequirementsGrid.tsx
    ("items.map((item, idx) => { // Try to split \"**Title:** Description\" const parts =",
     "items.map((item, idx) => {\n// Try to split \"**Title:** Description\"\nconst parts ="),

    # FasalHero.tsx
    ("export default function FasalHero({ fasalData }: any) { // \"Frontend Agent\": Implementing Zero-G physics and Automotive performance visuals. return",
     "export default function FasalHero({ fasalData }: any) {\n// \"Frontend Agent\": Implementing Zero-G physics and Automotive performance visuals.\nreturn"),

    # FasalGridGallery.tsx
    ("const sectionRef = useRef<HTMLElement>(null); // Flex values to determine relative width (Landscape vs Portrait/Square) const images =",
     "const sectionRef = useRef<HTMLElement>(null);\n// Flex values to determine relative width (Landscape vs Portrait/Square)\nconst images ="),

    # FasalGoalsGrid.tsx
    ("export default function FasalGoalsGrid({ goals }: any) { // Labels for the goals const goalTitles =",
     "export default function FasalGoalsGrid({ goals }: any) {\n// Labels for the goals\nconst goalTitles ="),

    # FasalFarmerObservations.tsx
    ("import { motion, AnimatePresence } from \"framer-motion\"; // Post-it note style themes // Added 'text' property to match border color family but ensuring readability (darker shades)",
     "import { motion, AnimatePresence } from \"framer-motion\";\n// Post-it note style themes\n// Added 'text' property to match border color family but ensuring readability (darker shades)\n"),
    ("]; // Real Data extracted from user images + new additions",
     "];\n// Real Data extracted from user images + new additions\n"),
    ("const currentTheme = THEMES[currentIndex % THEMES.length]; // Helper to check if a social platform is active for current farmer const hasSocial",
     "const currentTheme = THEMES[currentIndex % THEMES.length];\n// Helper to check if a social platform is active for current farmer\nconst hasSocial"),

    # FasalConclusionGrid.tsx
    ("function FasalConclusionGrid({ items }: { items: string[] }) { // Labels for the conclusions const conclusionTitles",
     "function FasalConclusionGrid({ items }: { items: string[] }) {\n// Labels for the conclusions\nconst conclusionTitles"),
    ("]; // Filter out the summary paragraph if it's passed here (the one that starts with \"These findings suggest...\") const gridItems",
     "];\n// Filter out the summary paragraph if it's passed here (the one that starts with \"These findings suggest...\")\nconst gridItems"),
    ("gridItems.map((item, idx) => { // Split bold title if present in the data string const hasBoldTitle",
     "gridItems.map((item, idx) => {\n// Split bold title if present in the data string\nconst hasBoldTitle"),
    ("else { // Just bold title without colon const boldMatch =",
     "else {\n// Just bold title without colon\nconst boldMatch ="),

    # ContactSection.tsx
    ("const CELL_SIZE = 80; // Muted, subtle but noticeable colour palette (light mode hex values) const MUTED_COLORS",
     "const CELL_SIZE = 80;\n// Muted, subtle but noticeable colour palette (light mode hex values)\nconst MUTED_COLORS"),
    ("]; // Dark mode equivalents (deeper but still muted) const MUTED_COLORS_DARK",
     "];\n// Dark mode equivalents (deeper but still muted)\nconst MUTED_COLORS_DARK"),
    ("export function buildRandomFills(total: number) { // -1 = empty, 0..N = colour index const density",
     "export function buildRandomFills(total: number) {\n// -1 = empty, 0..N = colour index\nconst density"),
    ("const [isDark, setIsDark] = useState(false); // Detect dark mode useEffect",
     "const [isDark, setIsDark] = useState(false);\n// Detect dark mode\nuseEffect"),
     
    # CaseStudyLayout.tsx
    ("FIG 1.0 // {caption}",
     "FIG 1.0 // {caption}\n"),

    # BackgroundGrid.tsx
    ("style={{ // @ts-ignore \"--x\": useMotionTemplate`${mouseX}px`, // @ts-ignore \"--y\"",
     "style={{\n// @ts-ignore\n\"--x\": useMotionTemplate`${mouseX}px`,\n// @ts-ignore\n\"--y\"")
]

for filepath in glob.glob(os.path.join(directory, "*.tsx")):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
        
    # Also fix some missed ones generally
    # Example: "} else if (cIdx === 1) { // Solution cardTheme"
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed comments in {os.path.basename(filepath)}")
