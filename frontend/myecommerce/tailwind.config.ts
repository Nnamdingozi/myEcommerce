import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bounceThrice: {
          '0%, 100%': { transform: 'translateY(0)' },  // Start and end at original position
          '20%, 60%': { transform: 'translateY(-25%)' }, // First and third bounce up
          '40%': { transform: 'translateY(0)' },  // Back to original position after first bounce
          '80%': { transform: 'translateY(0)' },  // Back to original position after second bounce
        },
      },
      animation: {
        bounceThrice: 'bounceThrice 1s ease-in-out',  // No need to loop it three times, keyframes handle that
      },
    
    },
  },

  plugins: [],

};
export default config;
