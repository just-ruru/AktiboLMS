/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        aktibo: {
          /* Brand */
          navy: '#000e53',        // primary brand navy - page chrome, hero bands
          'navy-deep': '#15203a', // heading text on light surfaces
          'navy-mid': '#304074',  // secondary navy tint
          gold: '#ffb700',        // primary accent
          'gold-hover': '#ffc933',
          'gold-soft': '#fff4d6',
          white: '#ffffff',

          /* Light surfaces */
          canvas: '#f4f6fa',   // app page background
          surface: '#ffffff',  // cards, panels
          'surface-alt': '#f8fafc',
          border: '#dee4ee',
          'border-strong': '#c7d0e0',

          /* Text */
          ink: '#15203a',      // primary text on light
          muted: '#596579',    // secondary text on light
          'muted-on-navy': '#d1d8ee',
          'ink-on-gold': '#000000',

          /* Status */
          'success-bg': '#e9f5ef',
          'success-fg': '#236543',
          'warning-bg': '#fff4d6',
          'warning-fg': '#8a5b00',
          'danger-bg': '#ffe8e8',
          'danger-fg': '#b3261e',
          'info-bg': '#e8f0fe',
          'info-fg': '#1a4fa0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Lexend Exa"', 'system-ui', 'sans-serif'],
        titling: ['"Castoro Titling"', '"Lexend Exa"', 'serif'],
      },
      maxWidth: {
        shell: '1296px',
        prose: '68ch',
      },
      borderRadius: {
        card: '16px',
        panel: '28px',
        control: '9px',
        field: '11px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(21, 32, 58, 0.04), 0 8px 24px rgba(21, 32, 58, 0.06)',
        'card-hover': '0 2px 4px rgba(21, 32, 58, 0.06), 0 16px 40px rgba(21, 32, 58, 0.10)',
        panel: '0 24px 60px rgba(0, 14, 83, 0.28)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
