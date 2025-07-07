import { nextui } from '@nextui-org/theme'


function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '1024px',
      lg: '1440px',
      xl: '1920px',
    },
    extend: {
      colors: {
        color: {
        1: withOpacityValue('--color-1'),
        2: withOpacityValue('--color-2'),
        3: withOpacityValue('--color-3'),
        4: withOpacityValue('--color-4'),
        5: withOpacityValue('--color-5'),
        6: withOpacityValue('--color-6'),
        7: withOpacityValue('--color-7'),
        8: withOpacityValue('--color-8'),
        9: withOpacityValue('--color-9'),
        10: withOpacityValue('--color-10'),
        11: withOpacityValue('--color-11'),
        12: withOpacityValue('--color-12'),
        13: withOpacityValue('--color-13'),
        14: withOpacityValue('--color-14'),
        },
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: 'dark',
    }),
  ],
}
