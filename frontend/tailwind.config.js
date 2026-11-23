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
          navy: "#000e53",
          gold: "#ffb700",
          white: "#ffffff",
        },
        /* ---- Foreground/Background (CSS custom properties mapped) ---- */
        fg: {
          primary: 'var(--fg-primary)',
          secondary: 'var(--fg-secondary)',
          tertiary: 'var(--fg-tertiary)',
          inverse: 'var(--fg-inverse)',
          muted: 'var(--fg-muted)',
        },
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          tertiary: 'var(--bg-tertiary)',
          hover: 'var(--bg-hover)',
          active: 'var(--bg-active)',
          inverse: 'var(--bg-inverse)',
        },
        border: {
          primary: 'var(--border-primary)',
          secondary: 'var(--border-secondary)',
          focus: 'var(--border-focus)',
          error: 'var(--border-error)',
        },
        /* ---- Button States ---- */
        btn: {
          primary: {
            bg: 'var(--btn-primary-bg)',
            hover: 'var(--btn-primary-hover)',
            active: 'var(--btn-primary-active)',
            fg: 'var(--btn-primary-fg)',
          },
          secondary: {
            bg: 'var(--btn-secondary-bg)',
            hover: 'var(--btn-secondary-hover)',
            active: 'var(--btn-secondary-active)',
            fg: 'var(--btn-secondary-fg)',
          },
          outline: {
            border: 'var(--btn-outline-border)',
            hover: 'var(--btn-outline-hover)',
            fg: 'var(--btn-outline-fg)',
          },
          accent: {
            bg: 'var(--btn-accent-bg)',
            hover: 'var(--btn-accent-hover)',
            active: 'var(--btn-accent-active)',
            fg: 'var(--btn-accent-fg)',
          },
        },
        /* ---- Input States ---- */
        input: {
          bg: 'var(--input-bg)',
          border: 'var(--input-border)',
          'focus-border': 'var(--input-focus-border)',
          placeholder: 'var(--input-placeholder)',
        },
        /* ---- Card States ---- */
        card: {
          bg: 'var(--card-bg)',
          border: 'var(--card-border)',
          shadow: 'var(--card-shadow)',
        },
        /* ---- Navbar ---- */
        navbar: {
          bg: 'var(--navbar-bg)',
          border: 'var(--navbar-border)',
        },
        /* ---- Sidebar ---- */
        sidebar: {
          bg: 'var(--sidebar-bg)',
          border: 'var(--sidebar-border)',
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Lexend Exa'", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
}
