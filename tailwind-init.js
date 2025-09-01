import fs from 'fs';
import path from 'path';

// Minimal Tailwind config
const config = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;

// Write tailwind.config.js
fs.writeFileSync(path.resolve(process.cwd(), 'tailwind.config.js'), config);

// Create postcss.config.js
const postcssConfig = `
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
`;
fs.writeFileSync(path.resolve(process.cwd(), 'postcss.config.js'), postcssConfig);

console.log('Tailwind initialized successfully.');
