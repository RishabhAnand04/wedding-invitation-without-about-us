// Painted art is WebP in public/art/; motifs without a painted version are still SVG placeholders.
const svgOnly = new Set(['vine-sprig']);

export const artFile = (name) => `${name}.${svgOnly.has(name) ? 'svg' : 'webp'}`;
export const art = (name) => `${import.meta.env.BASE_URL}art/${artFile(name)}`;
export const publicUrl = (path) => `${import.meta.env.BASE_URL}${String(path).replace(/^\/+/, '')}`;
