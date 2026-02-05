# Fresh Egg Designs Portfolio

A modern Next.js portfolio site built with TypeScript, Tailwind CSS, and MDX.

## Features

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **MDX** for project case studies
- **SEO optimized** with metadata and OpenGraph support
- **Accessible** design with semantic HTML and focus states
- **Responsive** mobile-first design

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with header/footer
│   ├── page.tsx           # Home page
│   ├── work/              # Work pages
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── resume/            # Resume page
├── components/            # React components
│   ├── layout/           # Header, Footer
│   ├── ui/               # Button, Card, Link
│   └── projects/         # ProjectCard, ProjectHeader
├── content/              # MDX content
│   └── projects/        # Project case studies
├── lib/                  # Utilities
│   ├── config.ts        # Site configuration
│   ├── mdx.ts           # MDX utilities
│   └── projects.ts      # Project loading utilities
└── public/              # Static assets
```

## Adding Projects

Create a new `.mdx` file in `content/projects/` with the following frontmatter:

```mdx
---
slug: my-project
title: My Project
client: Client Name
role: Product Designer
timeframe: 2024
tools:
  - Figma
  - React
summary: Brief project summary
problem: The problem statement
outcome: The outcome and results
tags:
  - Design
  - UX
featured_image: /images/project.jpg
---

Your MDX content here...
```

## Configuration

Edit `lib/config.ts` to customize:
- Site name and description
- Navigation links
- Social media links
- Contact information

## Customization

- **Colors**: Edit CSS variables in `app/globals.css`
- **Typography**: Modify Tailwind typography classes in `app/globals.css`
- **Components**: Customize UI components in `components/ui/`

## License

MIT
