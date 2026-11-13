# Aviral Nautiyal | Portfolio

Source code for my personal portfolio site.

**Live site:** https://aviral-portfolio-ccd0e.web.app

## About me

I'm an ML engineer based in Waterloo, Ontario, with an MSc in Computer Science from Lakehead University. My graduate research focused on medical imaging, convolutional neural networks and metaheuristic optimization. I'm looking for junior machine learning, data engineering and software engineering roles in the Kitchener-Waterloo and Greater Toronto area.

## What's on the site

A single-page site with an introduction, a short about section, projects, and contact links. My resume is available from the top of the page.

Each project card has a short write-up, the tech used, a link to a live demo and a link to the code. Two cards also include an interactive 3D diagram that you can rotate and click to see what each stage does.

### Projects

- **Brain tumor MRI classifier.** A pipeline that fuses features from three CNN backbones (ResNet50, VGG16, EfficientNetB0), selects features with Black Hole Optimization, and classifies with a custom Opt-SGD model. The decision threshold is set to 0.30 to favor recall, since a missed tumor costs more than a false alarm. It is served as a Gradio app on Google Cloud Run. The underlying research has been submitted to Springer Nature and is under peer review.
- **Canada Labour API.** A FastAPI service in front of Statistics Canada's labour force data. It has explicit error handling, retries only where waiting could help, a cache that knows StatCan's release schedule, offline tests, and keyless deployment to Google Cloud Run through GitHub Actions.

More projects will be added as I finish them, covering machine learning, deep learning and agentic AI.

## Built with

- React, Vite and TypeScript
- Tailwind CSS (a small custom theme: warm off-white, near-black text, one teal accent)
- Three.js, through React Three Fiber and Drei, for the interactive 3D diagrams (loaded lazily, so they don't slow the first paint)
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
  components/
    Hero, About, Projects, Contact, Footer   page sections
    PipelineScene.tsx                        3D diagram for the MRI classifier
    ApiFlowScene.tsx                         3D diagram for the Canada Labour API
  projects.ts     the list of projects; adding a project means adding one entry here
  index.css       Tailwind import and theme (colors, fonts)
public/           static files copied as-is (favicon, resume PDF)
```

To add a project, add an object to `src/projects.ts`. Set `visual` on it only if it has a 3D diagram.

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that runs `npm ci && npm run build` and publishes the `dist` folder to Firebase Hosting. If the build fails, nothing deploys and the live site stays on the last working version.

## Contact

- Email: nautiyalaviral@gmail.com
- GitHub: [avi-nauty](https://github.com/avi-nauty)
- LinkedIn: [aviral-nautiyal](https://linkedin.com/in/aviral-nautiyal)
