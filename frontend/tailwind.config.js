/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // AKTIBO design tokens — all values sourced from the Figma design system,
      // expressed as CSS/Tailwind tokens so nothing is hardcoded from the visual.
      colors: {
        aktif: {
          navy: "#000e53",
          gold: "#ffb700",
          white: "#ffffff",
        },
        // Semantic / surface colors used across screens
        surface: {
          light: "#f4f6fa",   // light panel / card fill
          white: "#ffffff",
        },
        border: {
          light: "#dee4ee",   // subtle card/input borders
          divider: "#304074", // header/footer divider lines
          focus: "#ffb700",   // focus ring
        },
        text: {
          primary: "#15203a",   // headings / strong labels
          secondary: "#596579", // body / meta text
          muted: "#cfd6e5",     // faint helper text
          inverse: "#ffffff",   // text on dark surfaces
        },
        state: {
          danger: "#a32c3b",    // destructive actions
        },
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "sans-serif"],
        display: ["'Lexend Exa'", "system-ui", "sans-serif"],
      },
      fontSize: {
        // AKTIBO type scale (from Figma text styles)
        "xs": ["10px", { lineHeight: "1.45", letterSpacing: "0" }],
        "sm": ["11px", { lineHeight: "1.45", letterSpacing: "0" }],
        "base": ["12px", { lineHeight: "1.45", letterSpacing: "0" }],
        "lg": ["13px", { lineHeight: "1.45", letterSpacing: "0" }],
        "xl": ["14px", { lineHeight: "1.45", letterSpacing: "0" }],
        "2xl": ["16px", { lineHeight: "1.45", letterSpacing: "0" }],
        "3xl": ["18px", { lineHeight: "1.45", letterSpacing: "0" }],
        "4xl": ["20px", { lineHeight: "1.4", letterSpacing: "0" }],
        "5xl": ["23px", { lineHeight: "1.45", letterSpacing: "0" }],
        "6xl": ["24px", { lineHeight: "1.45", letterSpacing: "0" }],
        "7xl": ["26px", { lineHeight: "1.45", letterSpacing: "0" }],
        "8xl": ["28px", { lineHeight: "1.4", letterSpacing: "0" }],
        "9xl": ["32px", { lineHeight: "1.4", letterSpacing: "0" }],
        "10xl": ["34px", { lineHeight: "1.45", letterSpacing: "0" }],
        "11xl": ["38px", { lineHeight: "1.45", letterSpacing: "0" }],
        "12xl": ["40px", { lineHeight: "1.4", letterSpacing: "0" }],
        "13xl": ["44px", { lineHeight: "1.45", letterSpacing: "0" }],
        "14xl": ["64px", { lineHeight: "0", letterSpacing: "-1.92px" }],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      spacing: {
        18: "4.5rem",
        // AKTIBO layout spacing (from Figma)
        "72": "72px",
        "144": "144px",
      },
      borderRadius: {
        sm: "6px",
        md: "8px",
        lg: "9px",
        xl: "10px",
        "2xl": "11px",
        "3xl": "12px",
        "4xl": "14px",
        "5xl": "16px",
        "6xl": "24px",
        "7xl": "28px",
      },
      lineHeight: {
        tight: "1.1",
        normal: "1.4",
        relaxed: "1.45",
      },
      letterSpacing: {
        tight: "-1.92px",
      },
      maxWidth: {
        page: "1440px",
      },
      height: {
        nav: "104px",
        brand: "56px",
        navItem: "48px",
        input: "48px",
        inputAuth: "42px",
        inputRegister: "46px",
        btn: "48px",
        btnSm: "44px",
        btnXs: "36px",
        btnTiny: "24px",
      },
      width: {
        navItem: {
          home: "96px",
          courses: "144px",
          pricing: "128px",
          account: "160px",
        },
      },
    },
  },
  plugins: [],
}
