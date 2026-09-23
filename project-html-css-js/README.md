# Nikitha's Web Development Practice Lab

**Project owner:** Nikitha (`nikitha-1709`)

A hands-on collection of HTML, CSS, JavaScript, DOM, browser API, mini-project, and Node.js exercises.

The easiest way to browse the whole collection is to open [index.html](index.html) in a browser. It provides a searchable catalog of the lessons and projects.

## Quick Start

### Browser exercises

No installation is required for the HTML, CSS, and browser-based JavaScript exercises.

1. Open [index1.html](index1.html), or open [index.html](index.html) for the main lesson index.
2. Select a lesson or project.
3. Edit the page in VS Code and refresh the browser to see changes.

A local web server is useful for exercises that use `fetch`, modules, browser storage, or other browser security-sensitive features. From the workspace root, run one of these commands if Python is installed:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

### Node.js exercises

Install [Node.js](https://nodejs.org/) first. The basic Node examples can be run directly:

```bash
cd nodejs-lab
node 01-client-server.js
```

For the Express backend examples, install the dependencies listed in [nodejs-lab/package.json](nodejs-lab/package.json):

```bash
cd nodejs-lab
npm install
node express-backend/index.js
```

Most server examples use port `3000`. Open <http://localhost:3000> when a server is running. Stop a server with `Ctrl+C`.

## Contents

### HTML lessons

The numbered root pages introduce HTML from basic elements through forms, media, semantic structure, responsive layouts, Bootstrap components, and a portfolio page.

- [HTML and CSS index](index.html)
- [Searchable complete catalog](index1.html)
- [Basic elements](01-basic-elements.html)
- [Lists and tables](02-lists.html)
- [Images, links, audio, and video](04-images-links.html) and [06-audio-video.html](06-audio-video.html)
- [Forms and HTML5 input types](05-student-registration.html) and [09-html5-input-types.html](09-html5-input-types.html)
- [Semantic and responsive HTML](08-semantic-elements.html) and [13-responsive.html](13-responsive.html)
- [Portfolio](15-portfolio.html)

### CSS exercises

The [css-exercises](css-exercises/) directory progresses from selectors, colors, typography, and the box model to flexbox, grid, responsive design, animation, forms, dashboards, and complete page layouts.

- [CSS exercise index](css-exercises/index.html)
- [CSS types and selectors](css-exercises/01-css-types.html) and [css-exercises/02-selectors.html](css-exercises/02-selectors.html)
- [Flexbox and grid](css-exercises/14-flexbox.html) and [css-exercises/15-grid.html](css-exercises/15-grid.html)
- [Responsive layouts](css-exercises/16-media-queries.html) and [css-exercises/74-complete-responsive.html](css-exercises/74-complete-responsive.html)
- [Final showcase](css-exercises/75-final-showcase.html)

### JavaScript exercises

The [javascript](javascript/) directory contains small, focused browser programs. Topics include values and operators, functions, arrays, objects, events, forms, asynchronous code, APIs, storage, regular expressions, and interactive pages.

- [JavaScript lab index](javascript/index.html)
- [Basic programs](javascript/basic-programs.html)
- [DOM and events overview](javascript/dom-events.html)
- [Advanced JavaScript overview](javascript/advanced.html)
- [DOM lab](javascript/dom-lab/index.html)
- [Browser storage lab](javascript/dom-lab/browser-storage.html)
- [Mini projects](javascript/mini-projects/index.html)

The numbered JavaScript pages are available in [javascript/](javascript/), including calculators, clocks, validation exercises, array and string problems, API examples, and a final interactive lab.

### Node.js backend

The [nodejs-lab](nodejs-lab/) directory introduces server-side JavaScript and Express.

- [Node.js lab index](nodejs-lab/index.html)
- [Node.js lab notes](nodejs-lab/README.md)
- [Core Node examples](nodejs-lab/)
- [Express backend index](nodejs-lab/express-backend/index.html)
- [Express backend notes](nodejs-lab/express-backend/README.md)
- [Express routing, middleware, CRUD, authentication, and REST API examples](nodejs-lab/express-backend/)

The Express examples cover routing, middleware, cookies and sessions, SQLite CRUD, authentication, authorization, and REST APIs. Test API routes with a browser, `curl`, or an API client such as Postman.

## Suggested Learning Path

1. Start with the numbered HTML lessons.
2. Complete the CSS exercises through the layout and responsive-design sections.
3. Work through the JavaScript basics, then DOM and browser API exercises.
4. Build the mini projects to combine the individual skills.
5. Finish with the Node.js core and Express backend labs.

## Working Conventions

- File names are numbered so the exercises can be completed in sequence.
- Most exercises are standalone files and do not require a build step.
- Keep changes inside the exercise you are studying unless a project explicitly shares files.
- Refresh the browser after editing an HTML, CSS, or client-side JavaScript page.
- Check the browser console and Node.js terminal output when debugging.

## Requirements

- A modern web browser
- VS Code or another code editor
- Node.js and npm for the backend exercises
- Optional: Python for a simple local web server

## License

This repository is a personal learning and practice collection. Add project-specific licensing information here if the repository is distributed publicly.
