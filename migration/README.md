# WordPress Migration Guide

This guide explains how to migrate your WordPress projects to MDX format.

## Prerequisites

- Node.js installed
- WordPress XML export file

## Setup

1. **Place your WordPress XML export file** in the `migration/` directory and name it `wordpress.xml`

   ```
   migration/
     └── wordpress.xml
   ```

   If your file has a different name, you can either:
   - Rename it to `wordpress.xml`, or
   - Update the `XML_FILE` path in `scripts/migrate-wordpress.js`

## Running the Migration

Run the migration script:

```bash
npm run migrate
```

By default, the script **will not overwrite** existing files in `content/projects/`.
If a slug already exists (for example, you already hand-authored `design-systems.mdx`),
the migrator will write `design-systems.wp.mdx` instead.

If you want to overwrite existing files, run:

```bash
npm run migrate -- --overwrite
```

The script will:
1. Parse the WordPress XML export
2. Extract projects matching:
   - Post type: `jetpack-portfolio`
   - URL pattern: `/projects-2/`
   - Category containing "project"
3. Generate MDX files in `content/projects/`
4. Create an index file at `content/projects-index.json`

## Output

### MDX Files

Each project will be converted to an MDX file in `content/projects/` with:
- **Filename**: Based on the WordPress slug (e.g., `design-systems.mdx`)
- **Frontmatter**: Extracted from WordPress (title, date, excerpt, tags)
- **Content**: Converted from HTML to markdown

### Index File

A JSON index is created at `content/projects-index.json` with:
```json
[
  {
    "slug": "design-systems",
    "title": "Design System at Scale",
    "date": "2022",
    "excerpt": "Brief description...",
    "tags": ["Design", "UX"]
  }
]
```

## Post-Migration Steps

After running the migration, you'll need to:

1. **Review each MDX file** and fill in missing frontmatter:
   - `client`: Client name
   - `role`: Your role (defaults to "Product Designer")
   - `tools`: Array of tools used
   - `problem`: Problem statement
   - `outcome`: Outcome/results

2. **Clean up content**:
   - Remove WordPress block comments
   - Fix image paths (update to `/images/...`)
   - Format markdown properly
   - Add case study sections using the template components

3. **Add images**:
   - Download images from WordPress
   - Place them in `public/images/`
   - Update image references in MDX files

4. **Use case study template**:
   - Add `<TLDR>` blocks
   - Use `<CaseStudySection>` for structured sections
   - Add `<CaseStudyImage>` components
   - Include `<WhatNext>` section

## Example: Updating a Migrated File

```mdx
---
slug: design-systems
title: Design System at Scale
client: TechCorp Inc.  # ← Add this
role: Lead Product Designer  # ← Update if needed
timeframe: 2022 - 2023
tools:  # ← Add this
  - Figma
  - React
  - Storybook
summary: Built a comprehensive design system...
problem: Multiple teams creating inconsistent UI...  # ← Add this
outcome: 60% reduction in design-to-development time...  # ← Add this
tags:
  - Design Systems
  - Product Design
---

<TLDR impact="Built a design system that reduced design-to-development time by 60%">
Quick summary here...
</TLDR>

<CaseStudySection title="Context">
Project context and background...
</CaseStudySection>

<CaseStudyImage 
  src="/images/design-system-audit.jpg" 
  alt="Design system audit" 
  caption="Audit findings"
  zoomable 
/>
```

## Troubleshooting

### No projects found

If the script finds 0 projects, check:
- Is your XML file in the correct location?
- Does it contain items with:
  - `wp:post_type` of `jetpack-portfolio`, or
  - URLs containing `/projects-2/`, or
  - Categories containing "project"

You can modify the `isProject()` function in `scripts/migrate-wordpress.js` to adjust the filter criteria.

### Content not converting properly

The HTML-to-markdown conversion is basic. You may need to:
- Manually clean up complex HTML structures
- Fix image references
- Reformat lists and headings
- Remove WordPress-specific shortcodes

### Slug conflicts

If you have duplicate slugs, the script will overwrite files. Check the console output to see which files are created.

## Customization

You can customize the migration by editing `scripts/migrate-wordpress.js`:

- **Change filter criteria**: Modify the `isProject()` function
- **Adjust frontmatter**: Update `generateFrontmatter()`
- **Improve content cleaning**: Enhance `cleanContent()`
- **Change output location**: Update `OUTPUT_DIR` constant

## Need Help?

If you encounter issues:
1. Check the console output for error messages
2. Verify your XML file structure
3. Review the script code for customization options

