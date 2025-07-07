'use client'

import { ColorTemplate } from '@/payload-types'

interface DynamicThemeStylesProps {
  colorTemplates: ColorTemplate[]
}

function hexToRgbTriplet(hex: string): string {
  // Clean input
  hex = hex.replace(/^#/, '')

  // Handle shorthand hex e.g. #fff
  if (hex.length === 3) {
    hex = hex.split('').map((char) => char + char).join('')
  }

  const r = parseInt(hex.slice(0, 2), 16)
  const g = parseInt(hex.slice(2, 4), 16)
  const b = parseInt(hex.slice(4, 6), 16)

  return `${r} ${g} ${b}`
}


export default function DynamicThemeStyles({ colorTemplates }: DynamicThemeStylesProps) {
  // Generate CSS variables for each template
  const themeStyles = colorTemplates
    .map((template) => {
      const themeName = template.id
      const colorVars = template.colorGroup
        ?.map((colorGroup, index) => {
          const rawColor = typeof colorGroup === 'string' ? colorGroup : colorGroup.color
          const rgbColor = hexToRgbTriplet(rawColor)
          return `  --color-${index + 1}: ${rgbColor};`
        })
        .join('\n')

      return `[data-theme="${themeName}"] {
${colorVars}
}`
    })
    .join('\n\n')

  return (
    <style jsx global>{`
      :root {
        --font-mono: 'Roboto Mono', monospace;
        --color-1: 242 235 46;
        --color-2: 137 89 230;
        --color-3: 0 0 0;
        --color-4: 137 89 230;
        --color-5: 35 20 48;
        --color-6: 19 19 19;
        --color-7: 255 255 255;
        --color-8: 16 14 26;
        --color-9: 130 95 163;
        --color-10: 255 255 255;
        --color-11: 246 170 34;
        --color-12: 130 95 163;
        --color-13: 255 255 255;
        --color-14: 255 255 255;
      }
      ${themeStyles}
    `}</style>
  )
}