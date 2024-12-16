/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deadsec-dark': '#0a0a0f',
        'deadsec-blue': '#00fff9',
        'deadsec-purple': '#FF00FF',
        'deadsec-gray': '#1a1a24',
      },
      animation: {
        'glitch': 'glitch 0.5s infinite',
        'scan': 'scan 2s linear infinite',
        'pulse': 'pulse 2s infinite',
        'noise': 'noise 0.5s infinite',
        'progress': 'progress 2s linear',
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        scroll: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' }
        }
      }
    },
  },
  plugins: [],
}