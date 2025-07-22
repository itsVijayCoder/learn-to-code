import type { Config } from "tailwindcss";

const config: Config = {
   darkMode: "class",
   content: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         colors: {
            // CSS variables for theming
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
               50: "#faf5ff",
               100: "#f3e8ff",
               200: "#e9d5ff",
               300: "#d8b4fe",
               400: "#c084fc",
               500: "#a855f7",
               600: "#9333ea",
               700: "#7c3aed",
               800: "#6b21a8",
               900: "#581c87",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            chart: {
               "1": "hsl(var(--chart-1))",
               "2": "hsl(var(--chart-2))",
               "3": "hsl(var(--chart-3))",
               "4": "hsl(var(--chart-4))",
               "5": "hsl(var(--chart-5))",
            },
         },
         borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },
         fontFamily: {
            sans: [
               "Inter",
               "-apple-system",
               "BlinkMacSystemFont",
               "Segoe UI",
               "Roboto",
               "Helvetica Neue",
               "Arial",
               "sans-serif",
            ],
            mono: [
               "JetBrains Mono",
               "Fira Code",
               "Monaco",
               "Cascadia Code",
               "Consolas",
               "monospace",
            ],
         },
         fontSize: {
            xs: ["0.75rem", { lineHeight: "1rem" }],
            sm: ["0.875rem", { lineHeight: "1.25rem" }],
            base: ["1rem", { lineHeight: "1.5rem" }],
            lg: ["1.125rem", { lineHeight: "1.75rem" }],
            xl: ["1.25rem", { lineHeight: "1.75rem" }],
            "2xl": ["1.5rem", { lineHeight: "2rem" }],
            "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
            "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
            "5xl": ["3rem", { lineHeight: "1" }],
            "6xl": ["3.75rem", { lineHeight: "1" }],
         },
         spacing: {
            "18": "4.5rem",
            "88": "22rem",
            "100": "25rem",
            "112": "28rem",
            "128": "32rem",
         },
         animation: {
            "fade-in": "fadeIn 0.5s ease-out",
            "fade-out": "fadeOut 0.5s ease-out",
            "slide-up": "slideUp 0.3s ease-out",
            "slide-down": "slideDown 0.3s ease-out",
            "slide-left": "slideLeft 0.3s ease-out",
            "slide-right": "slideRight 0.3s ease-out",
            "scale-up": "scaleUp 0.2s ease-out",
            "scale-down": "scaleDown 0.2s ease-out",
            "bounce-soft": "bounceSoft 0.6s ease-out",
            shimmer: "shimmer 2s linear infinite",
            "pulse-soft": "pulseSoft 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            float: "float 3s ease-in-out infinite",
         },
         keyframes: {
            fadeIn: {
               "0%": { opacity: "0" },
               "100%": { opacity: "1" },
            },
            fadeOut: {
               "0%": { opacity: "1" },
               "100%": { opacity: "0" },
            },
            slideUp: {
               "0%": { opacity: "0", transform: "translateY(20px)" },
               "100%": { opacity: "1", transform: "translateY(0)" },
            },
            slideDown: {
               "0%": { opacity: "0", transform: "translateY(-20px)" },
               "100%": { opacity: "1", transform: "translateY(0)" },
            },
            slideLeft: {
               "0%": { opacity: "0", transform: "translateX(20px)" },
               "100%": { opacity: "1", transform: "translateX(0)" },
            },
            slideRight: {
               "0%": { opacity: "0", transform: "translateX(-20px)" },
               "100%": { opacity: "1", transform: "translateX(0)" },
            },
            scaleUp: {
               "0%": { opacity: "0", transform: "scale(0.9)" },
               "100%": { opacity: "1", transform: "scale(1)" },
            },
            scaleDown: {
               "0%": { opacity: "1", transform: "scale(1)" },
               "100%": { opacity: "0", transform: "scale(0.9)" },
            },
            bounceSoft: {
               "0%, 20%, 53%, 80%, 100%": { transform: "translate3d(0,0,0)" },
               "40%, 43%": { transform: "translate3d(0,-8px,0)" },
               "70%": { transform: "translate3d(0,-4px,0)" },
               "90%": { transform: "translate3d(0,-2px,0)" },
            },
            shimmer: {
               "0%": { backgroundPosition: "-200% 0" },
               "100%": { backgroundPosition: "200% 0" },
            },
            pulseSoft: {
               "0%, 100%": { opacity: "1" },
               "50%": { opacity: "0.7" },
            },
            float: {
               "0%, 100%": { transform: "translateY(0px)" },
               "50%": { transform: "translateY(-10px)" },
            },
         },
         backdropBlur: {
            xs: "2px",
         },
         boxShadow: {
            glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
            "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
            soft: "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
            medium:
               "0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            hard: "0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 4px 25px -5px rgba(0, 0, 0, 0.1)",
         },
         gradientColorStops: {
            "primary-gradient": "var(--primary-gradient)",
            "secondary-gradient": "var(--secondary-gradient)",
         },
      },
   },
   plugins: [
      require("@tailwindcss/typography"),
      function ({ addUtilities }: { addUtilities: any }) {
         const utilities = {
            ".glass": {
               background: "rgba(255, 255, 255, 0.1)",
               backdropFilter: "blur(10px)",
               border: "1px solid rgba(255, 255, 255, 0.2)",
            },
            ".glass-dark": {
               background: "rgba(0, 0, 0, 0.1)",
               backdropFilter: "blur(10px)",
               border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            ".text-balance": {
               textWrap: "balance",
            },
            ".text-pretty": {
               textWrap: "pretty",
            },
            ".scrollbar-hide": {
               "-ms-overflow-style": "none",
               "scrollbar-width": "none",
               "&::-webkit-scrollbar": {
                  display: "none",
               },
            },
            ".gradient-text": {
               background:
                  "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%)",
               "-webkit-background-clip": "text",
               "background-clip": "text",
               "-webkit-text-fill-color": "transparent",
            },
            ".animate-shimmer": {
               background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
               "background-size": "200% 100%",
               animation: "shimmer 2s infinite",
            },
         };
         addUtilities(utilities);
      },
   ],
} satisfies Config;

export default config;
