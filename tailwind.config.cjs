// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',      // violeta médio
        secondary: '#10B981',    // verde-esmeralda
        accent: '#F59E0B',       // âmbar
        neutral: {
          50:  '#F9FAFB',        // branco gelo
          900: '#1F2937',        // cinza-escuro
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        md: '0.5rem',
        lg: '1rem',
      },
      boxShadow: {
        card:  '0 4px 6px rgba(0,0,0,0.1)',
        input: 'inset 0 1px 2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),  // para inputs/formulários mais bonitos
  ],
};
