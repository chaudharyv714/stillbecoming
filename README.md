# Still Becoming

A personal digital archive and evolving autobiography, built with Next.js App Router. The site brings together a personal story, interests, dated notes, photographs, and a bucket list.

## Website structure

### Pages and routes

| Route | Page |
| --- | --- |
| `/` | Home page: current status, upcoming goals, photo moments, a recent note, and a current interest. |
| `/story` | A narrative told through story chapters. |
| `/things` | An archive of interests and fascinations. |
| `/notes` | Notes archive with dates, categories, and summaries. |
| `/notes/[slug]` | Individual note page, selected by its URL slug. |
| `/bucket` | Bucket list, organized into themed sections and progress statuses. |

The shared site header and footer are rendered by the root layout, so they appear across the pages. The root layout also defines site metadata, viewport settings, and the skip-to-content link.

### Main folders and files

```text
app/
  page.tsx                 Home route
  story/page.tsx           Story route
  things/page.tsx          Interests route
  notes/page.tsx           Notes archive route
  notes/[slug]/page.tsx    Individual note route
  bucket/page.tsx          Bucket list route
  layout.tsx               Shared layout, header/footer, and site metadata
  globals.css              Global styles and design system
components/
  site/                    Site-specific sections and reusable page components
  ui/                      Shared interface primitives
lib/
  content.ts               Notes, interests, story chapters, and bucket-list content
  utils.ts                 Shared utility functions
public/
  images/                  Photography used by the site
  icon.svg                 Site icon
```

### Content and assets

The site's editorial content is currently defined in `lib/content.ts` as TypeScript data. Page components import the relevant collections from that file. Images are stored in `public/images/` and referenced by their public paths, such as `/images/home-hero.png`. To update an entry, edit the relevant data in `lib/content.ts`; to add or replace an image, put the asset in `public/images/` and update its path and descriptive alt text.

## Run locally from GitHub

### Requirements

- Git
- Node.js 20.9 or later
- Corepack (included with current Node.js releases)

The project pins pnpm `12.3.4` through the `packageManager` field in `package.json`. No environment variables or external services are required to run the current site locally.

### Setup steps

1. **Clone the GitHub repository:**

   ```bash
   git clone https://github.com/chaudharyv714/stillbecoming.git
   ```

2. **Enter the project directory:**

   ```bash
   cd stillbecoming
   ```

3. **Enable Corepack** so it can use the pnpm version specified by the project:

   ```bash
   corepack enable
   ```

4. **Install dependencies:**

   ```bash
   pnpm install
   ```

   If prompted to download the pinned pnpm version, allow Corepack to do so.

5. **Start the development server:**

   ```bash
   pnpm dev
   ```

6. **Open the local site** at [http://localhost:3000](http://localhost:3000). The development server supports hot reload while you edit files.

### Useful commands

```bash
pnpm dev      # Start the local development server
pnpm build    # Create a production build
pnpm start    # Serve the production build locally (run pnpm build first)
```

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- pnpm for package management
