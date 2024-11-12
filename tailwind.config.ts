import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#121212',
          text: '#E0E0E0',
          primary: '#1DB954',
          secondary: '#535353',
          accent: '#F5F5F5',
        },
        light: {
          background: '#FFFFFF',
          text: '#121212',
          primary: '#0077B6',
          secondary: '#00B4D8',
          accent: '#90E0EF',
        },
        minimalBlue: {
          background: '#FFFFFF',
          text: '#212121',
          primary: '#3498DB',
          secondary: '#BDC3C7',
          accent: '#2980B9',
        },
        pastel: {
          background: '#F7F6F2',
          text: '#2B2D42',
          primary: '#8D99AE',
          secondary: '#EDF2F4',
          accent: '#EF233C',
        },
        purpleMono: {
          background: '#F3F1F5',
          text: '#333333',
          primary: '#6C5B7B',
          secondary: '#C06C84',
          accent: '#F67280',
        },
        darkYellow: {
          background: '#1E1E24',
          text: '#FAFAFA',
          primary: '#FCA311',
          secondary: '#E5E5E5',
          accent: '#F77F00',
        },
        retroGreen: {
          background: '#FCF8E8',
          text: '#2F2F2F',
          primary: '#3A5A40',
          secondary: '#A3B18A',
          accent: '#DDA15E',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
