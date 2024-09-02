import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "red": "hsl(14, 86%, 42%)",
        'redHover': 'hsl(14, 86%, 37%)',
        "green": "hsl(159, 69%, 38%)",
        "rose50": "hsl(20, 50%, 98%)",
        "rose100": "hsl(13, 31%, 94%)",
        "rose300": "hsl(14, 25%, 72%)",
        "rose400": "hsl(7, 20%, 60%)",
        "rose500": "hsl(12, 20%, 44%)",
        "rose900": "hsl(14, 65%, 9%)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        redHatText: ["Red Hat Text", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
