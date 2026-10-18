import en from './content.js';
import hiText from './content.hi.js';

export const LANGS = ['en', 'hi'];

// Hindi falls back to the English value for anything content.hi.js leaves out.
const merge = (base, over) => {
  if (over === undefined) return base;
  if (Array.isArray(base)) return base.map((item, i) => merge(item, over?.[i]));
  if (base && typeof base === 'object') {
    const out = { ...base };
    for (const key of Object.keys(over ?? {})) out[key] = merge(base[key], over[key]);
    return out;
  }
  return over;
};

export const content = { en, hi: merge(en, hiText) };

export const fill = (template = '', vars = {}) => String(template).replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? '');
