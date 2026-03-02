type KeyAction = {
    label: string;
    value: string;
};

type Section = {
    title?: string;
    content?: string | string[];
    items?: string[];
};

type ProjectLike = {
    title?: string;
    headline?: string;
    problem?: string;
    problem_statement?: string;
    about?: {
        description?: string;
        key_actions?: KeyAction[];
    };
    about_app?: string;
    focus_areas?: string[];
    tools?: string[];
    tags?: string[];
    sections?: Section[];
};

export const calculateReadingTime = (project: ProjectLike): number => {
    let text = "";
    text += project.title + " ";
    text += project.headline + " ";
    text += project.problem + " ";
    if (project.problem_statement) text += project.problem_statement + " ";
    if (project.about?.description) text += project.about.description + " ";
    if (project.about?.key_actions) {
        project.about.key_actions.forEach((a) => {
            text += `${a.label} ${a.value} `;
        });
    }
    if (project.about_app) text += project.about_app + " ";
    if (project.focus_areas) text += project.focus_areas.join(" ") + " ";
    if (project.tools) text += project.tools.join(" ") + " ";
    if (project.tags) text += project.tags.join(" ") + " ";

    project.sections?.forEach((section) => {
        if (section.title) text += section.title + " ";
        if (Array.isArray(section.content)) {
            text += section.content.join(" ") + " ";
        } else if (typeof section.content === 'string') {
            text += section.content + " ";
        }
        if (section.items) text += section.items.join(" ") + " ";
    });

    // Approximate words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;
    // Assume 200 words per minute
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes); // Minimum 1 min
};
