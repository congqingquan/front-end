1. Install tailwindcss and its peer dependencies, then generate your tailwind.config.js and postcss.config.js files.
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

2. Add the paths to all of your template files in your tailwind.config.js file.
```
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

3. Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

4. Include index.cass file in main.jsx file:
```
import './index.css';
```