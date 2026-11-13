export interface ToolMeta {
  slug: string
  title: string
  description: string
  href: string
}

export const tools: ToolMeta[] = [
  {
    slug: 'expo-assets',
    title: 'Expo Assets Generator',
    description:
      'SVG or PNG logo in, production-ready icon.png, splash, adaptive and Material You layers out as a matching .zip.',
    href: '/tools/expo-assets',
  },
  {
    slug: 'halftone',
    title: 'Halftone Image Generator',
    description:
      'Dot, line and CMYK rosette screens from luminance and alpha math. Transparent backgrounds preserved.',
    href: '/tools/halftone',
  },
  {
    slug: 'latex-markdown',
    title: 'LaTeX & Markdown Editor',
    description:
      'Split-pane live preview with math rendering. Export clean HTML, Markdown or print-ready PDF.',
    href: '/tools/latex-markdown',
  },
]
