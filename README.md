# Aviral Nautiyal | Portfolio

Source code for my personal portfolio site.

**Live site:** https://aviral-portfolio-ccd0e.web.app

## About me

I'm an ML engineer based in Waterloo, Ontario, with an MSc in Computer Science from Lakehead University. My graduate research focused on medical imaging, convolutional neural networks and metaheuristic optimization. I'm looking for junior machine learning, data engineering and software engineering roles in the Kitchener-Waterloo and Greater Toronto area.

## What's on the site

A single-page site with four sections: an introduction, a short about section, projects, and contact links. My resume is available from the top of the page.

Projects are added as I finish them. The first one is a brain tumor MRI classifier:

- **Brain tumor MRI classifier.** A pipeline that fuses features from three CNN backbones (ResNet50, VGG16, EfficientNetB0), selects features with Binary Harmony Optimization, and classifies with a custom Opt-SGD model. The decision threshold is set to 0.30 to favor recall, since a missed tumor costs more than a false alarm. The underlying research has been submitted to a journal and is under peer review. A live demo, deployed on Google Cloud Run, is linked from the site once it is up.

Upcoming projects will cover machine learning, deep learning and agentic AI.

## Built with

- React, Vite and TypeScript
- Tailwind CSS (a small custom theme: warm off-white, near-black text, one teal accent)
- Firebase Hosting
- GitHub Actions, which builds and deploys automatically on every push to `main`

## Running it locally

```bash
git clone https://github.com/avi-nauty/portfolio.git
cd portfolio
npm install
npm run dev
```

The dev server runs at http://localhost:5173. To check a production build, run `npm run build` and then `npm run preview`.

## Project structure

```
src/
  components/     one file per page section (Hero, About, Projects, Contact)
  projects.ts     the list of projects; adding a project means adding one entry here
  index.css       Tailwind import and theme (colors, fonts)
public/           static files copied as-is (favicon, resume PDF)
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that runs `npm ci && npm run build` and publishes the `dist` folder to Firebase Hosting. If the build fails, nothing deploys and the live site stays on the last working version.

## Contact

- Email: nautiyalaviral@gmail.com
- GitHub: [avi-nauty](https://github.com/avi-nauty)
- LinkedIn: [aviral-nautiyal](https://linkedin.com/in/aviral-nautiyal)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
