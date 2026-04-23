# Art and Culture

A multi-page static website exploring different forms of visual art — painting, sculpture, photography, architecture, and digital art.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page with art type overviews and upcoming events |
| Painting | `pages/painting.html` | History, gallery, and tools for painters |
| Sculpture | `pages/sculpture.html` | 3D rotating cube showcase and history |
| Photography | `pages/photography.html` | History and gallery |
| Architecture | `pages/architecture.html` | History and gallery |
| Digital Art | `pages/digital.html` | History and digital gallery |
| Artwork Presentations | `pages/artwork.html` | Exhibitions, artist spotlights, modals, canvas drawing tool |
| Techniques | `pages/interview.html` | Art technique guides and supply reviews |
| About Us | `pages/about.html` | Mission, services, timeline, and testimonials |

## Running the project

Open any `.html` file directly in a browser, or use a local server:

**VS Code Live Server** (recommended):
1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**
3. Runs on `http://localhost:3000`

**Python:**
```bash
python -m http.server 3000
```

Then open `http://localhost:3000`.

## Project structure

```
Art/
├── index.html
├── README.md
│
├── pages/
│   ├── about.html
│   ├── architecture.html
│   ├── artwork.html
│   ├── digital.html
│   ├── interview.html
│   ├── painting.html
│   ├── photography.html
│   └── sculpture.html
│
├── assets/
│   ├── css/
│   │   ├── base.css         # Design tokens, body, footer, shared animations
│   │   ├── navbar.css       # Shared responsive navbar (BEM, accessible)
│   │   ├── style.css        # Home page
│   │   ├── about.css        # About page (timeline, testimonials)
│   │   ├── artwork.css      # Artwork presentations (modals, gallery, canvas)
│   │   ├── interview.css    # Techniques page
│   │   ├── painting.css     # Painting page (photo grid, tools)
│   │   ├── sculpture.css    # Sculpture page (3D CSS cube)
│   │   └── art-page.css     # Shared for photography, architecture, digital
│   ├── images/              # All image assets (JPG, PNG, WEBP, AVIF)
│   └── js/
│       └── main.js          # Navbar toggle, modals, canvas drawing
```

## Tech stack

- **HTML5** — semantic markup, ARIA accessibility attributes
- **CSS3** — Flexbox, Grid, custom animations, `@keyframes`, 3D transforms (`perspective`, `rotateX/Y`, `translateZ`)
- **Vanilla JavaScript** — hamburger nav toggle, modal dialogs, HTML5 Canvas drawing tool
- No frameworks, no build step, no dependencies
