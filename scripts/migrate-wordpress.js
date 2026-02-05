const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");

/**
 * WordPress to MDX Migration Script
 * 
 * Parses WordPress XML export and converts project posts to MDX files
 */

/**
 * Normalize xml2js nodes into text.
 * WordPress export values often come through as:
 * - string
 * - { _: "value" }
 * - [ "value" ] or [ { _: "value" } ]
 */
function getText(node) {
  if (node == null) return "";
  if (Array.isArray(node)) return getText(node[0]);
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "object" && typeof node._ === "string") return node._;
  return "";
}

// Try to find WordPress XML file
function findXMLFile() {
  const possiblePaths = [
    path.join(__dirname, "../migration/wordpress.xml"),
    path.join(__dirname, "../migration/fresheggdesigns.WordPress.2026-02-05.xml"),
    path.join(__dirname, "../migration/Wordpress Portfolio/fresheggdesigns.WordPress.2026-02-05.xml"),
  ];
  
  for (const filePath of possiblePaths) {
    if (fs.existsSync(filePath)) {
      return filePath;
    }
  }
  
  return possiblePaths[0]; // Return default for error message
}

const XML_FILE = findXMLFile();
const OUTPUT_DIR = path.join(__dirname, "../content/projects");
const INDEX_FILE = path.join(__dirname, "../content/projects-index.json");
const OVERWRITE = process.argv.includes("--overwrite");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Clean HTML content and convert to markdown-friendly format
 */
function cleanContent(html) {
  if (!html) return "";
  
  let cleaned = html;
  
  // Remove WordPress block comments
  cleaned = cleaned.replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "");
  
  // Remove ALL WordPress shortcodes (Divi Builder, etc.)
  // Match [shortcode...] and [/shortcode] patterns, including multi-line
  cleaned = cleaned.replace(/\[et_pb[^\]]*\][^\[]*/g, "");
  cleaned = cleaned.replace(/\[\/et_pb[^\]]*\]/g, "");
  cleaned = cleaned.replace(/\[et_[^\]]*\]/g, "");
  cleaned = cleaned.replace(/\[\/et_[^\]]*\]/g, "");
  cleaned = cleaned.replace(/\[wp:[^\]]*\]/g, "");
  cleaned = cleaned.replace(/\[\/wp:[^\]]*\]/g, "");
  
  // Remove any remaining shortcode-like patterns [anything with attributes]
  // But be careful not to remove markdown links [text](url)
  // Match [something] that is NOT followed by (url)
  cleaned = cleaned.replace(/\[([^\]]+)\](?!\()/g, "");
  
  // Decode HTML entities
  cleaned = cleaned
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
  
  // Extract text from HTML tags but preserve structure
  cleaned = cleaned
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
    .replace(/<b[^>]*>(.*?)<\/b>/gi, "**$1**")
    .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
    .replace(/<i[^>]*>(.*?)<\/i>/gi, "*$1*")
    .replace(/<a[^>]*href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi, "[$2]($1)")
    .replace(/<img[^>]*src=["']([^"']+)["'][^>]*alt=["']([^"']*)["'][^>]*>/gi, "![$2]($1)")
    .replace(/<img[^>]*src=["']([^"']+)["'][^>]*>/gi, "![]($1)")
    .replace(/<ul[^>]*>/gi, "\n")
    .replace(/<\/ul>/gi, "\n")
    .replace(/<ol[^>]*>/gi, "\n")
    .replace(/<\/ol>/gi, "\n")
    .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<div[^>]*>/gi, "\n")
    .replace(/<\/div>/gi, "\n")
    .replace(/<span[^>]*>/gi, "")
    .replace(/<\/span>/gi, "")
    .replace(/<[^>]+>/g, "") // Remove any remaining HTML tags
    .replace(/\n{3,}/g, "\n\n") // Normalize multiple newlines
    .trim();
  
  return cleaned;
}

/**
 * Extract slug from WordPress post name or URL
 */
function extractSlug(item) {
  // Try post_name first
  const postName = getText(item["wp:post_name"]);
  if (postName) return postName.trim();
  
  // Fallback to link URL
  const url = getText(item.link);
  if (url) {
    const match = url.match(/\/([^\/]+)\/?$/);
    if (match) {
      return match[1].trim();
    }
  }
  
  // Fallback to title
  const title = getText(item.title);
  if (title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }
  
  return "untitled";
}

/**
 * Format date for frontmatter
 */
function formatDate(dateString) {
  if (!dateString) return "";
  
  try {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // YYYY-MM-DD
  } catch (e) {
    return "";
  }
}

/**
 * Extract year from date
 */
function extractYear(dateString) {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.getFullYear();
  } catch (e) {
    return null;
  }
}

/**
 * Check if item is a project
 */
function isProject(item) {
  // Check post type
  const postType = getText(item["wp:post_type"]);
  if (postType === "jetpack-portfolio") {
    return true;
  }
  
  // Check URL pattern
  const url = getText(item.link);
  if (url) {
    if (url.includes("/projects-2/") && !url.endsWith("/projects-2/")) {
      return true;
    }
  }
  
  // Check categories
  if (item.category) {
    const categories = Array.isArray(item.category) ? item.category : [item.category];
    for (const cat of categories) {
      const catName = cat._ || cat;
      if (typeof catName === "string" && catName.toLowerCase().includes("project")) {
        return true;
      }
    }
  }
  
  return false;
}

/**
 * Generate frontmatter from WordPress item
 */
function generateFrontmatter(item, slug) {
  const title = getText(item.title).trim() || "Untitled";
  
  const excerptRaw = getText(item["excerpt:encoded"]).trim() || getText(item.description).trim();
  
  const postDate = getText(item["wp:post_date"]).trim() || getText(item.pubDate).trim();
  
  const date = postDate ? formatDate(postDate) : "";
  const year = extractYear(postDate);
  const timeframe = year ? year.toString() : date;
  
  // Extract categories/tags
  const tags = [];
  if (item.category) {
    const categories = Array.isArray(item.category) ? item.category : [item.category];
    categories.forEach((cat) => {
      const catName = cat._ || cat;
      if (typeof catName === "string" && catName.trim()) {
        tags.push(catName.trim());
      }
    });
  }
  
  const frontmatter = {
    slug: slug,
    title: title,
    date: date,
    excerpt: excerptRaw || "",
    client: "", // Will need to be filled manually
    role: "Product Designer", // Default, can be updated
    timeframe: timeframe,
    tools: [], // Will need to be filled manually
    summary: excerptRaw || "",
    problem: "", // Will need to be filled manually
    outcome: "", // Will need to be filled manually
    tags: tags.length > 0 ? tags : ["Design"],
  };
  
  return frontmatter;
}

/**
 * Generate MDX file content
 */
function generateMDX(frontmatter, content) {
  const frontmatterString = Object.entries(frontmatter)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length === 0) return null;
        return `${key}:\n${value.map((v) => `  - ${v}`).join("\n")}`;
      }
      if (value === "") return null;
      return `${key}: ${typeof value === "string" && value.includes(":") ? `"${value}"` : value}`;
    })
    .filter((line) => line !== null)
    .join("\n");
  
  return `---\n${frontmatterString}\n---\n\n${content}`;
}

/**
 * Main migration function
 */
async function migrate() {
  console.log("🚀 Starting WordPress to MDX migration...\n");
  
  // Check if XML file exists
  if (!fs.existsSync(XML_FILE)) {
    console.error(`❌ Error: XML file not found at ${XML_FILE}`);
    console.log("\n💡 Tip: Place your WordPress export file at migration/wordpress.xml");
    process.exit(1);
  }
  
  console.log(`📖 Reading XML file: ${XML_FILE}`);
  
  // Read and parse XML
  const xmlContent = fs.readFileSync(XML_FILE, "utf8");
  const parser = new xml2js.Parser({
    explicitArray: true,
    mergeAttrs: true,
    explicitCharkey: true,
    charkey: "_",
  });
  
  let result;
  try {
    result = await parser.parseStringPromise(xmlContent);
  } catch (error) {
    console.error("❌ Error parsing XML:", error.message);
    process.exit(1);
  }
  
  // Extract items
  const channel = result.rss?.channel?.[0];
  if (!channel || !channel.item) {
    console.error("❌ Error: No items found in XML");
    process.exit(1);
  }
  
  const items = Array.isArray(channel.item) ? channel.item : [channel.item];
  console.log(`📦 Found ${items.length} items in XML\n`);
  
  // Filter projects
  const projectsRaw = items.filter(isProject);

  // Dedupe by slug; prefer published jetpack-portfolio with more content
  const bySlug = new Map();
  for (const item of projectsRaw) {
    const slug = extractSlug(item);
    const postType = getText(item["wp:post_type"]);
    const status = getText(item["wp:status"]);
    const contentLen = getText(item["content:encoded"]).length;

    const score =
      (postType === "jetpack-portfolio" ? 100 : 0) +
      (status === "publish" ? 10 : 0) +
      Math.min(contentLen, 10000) / 1000; // up to +10

    const existing = bySlug.get(slug);
    if (!existing || score > existing.score) {
      bySlug.set(slug, { item, score });
    }
  }
  const projects = Array.from(bySlug.values()).map((x) => x.item);

  console.log(
    `✅ Found ${projects.length} project(s) to migrate (from ${projectsRaw.length} matches)\n`
  );
  
  if (projects.length === 0) {
    console.log("⚠️  No projects found. Check your filter criteria:");
    console.log("   - Post type: jetpack-portfolio");
    console.log("   - URL pattern: /projects-2/");
    console.log("   - Category: contains 'project'");
    process.exit(0);
  }
  
  // Process each project
  const projectIndex = [];
  
  for (const item of projects) {
    const slug = extractSlug(item);
    console.log(`📝 Processing: ${slug}`);
    
    const frontmatter = generateFrontmatter(item, slug);
    const content = cleanContent(getText(item["content:encoded"]));

    // If no excerpt, fall back to first ~200 chars of cleaned content
    if (!frontmatter.excerpt) {
      const snippet = content.replace(/\s+/g, " ").trim().slice(0, 200);
      frontmatter.excerpt = snippet;
      if (!frontmatter.summary) frontmatter.summary = snippet;
    }
    
    const mdxContent = generateMDX(frontmatter, content);

    let outputPath = path.join(OUTPUT_DIR, `${slug}.mdx`);
    if (!OVERWRITE && fs.existsSync(outputPath)) {
      // Avoid overwriting hand-authored case studies
      outputPath = path.join(OUTPUT_DIR, `${slug}.wp.mdx`);
      console.log(`   ⚠️  ${slug}.mdx exists — writing ${path.basename(outputPath)} instead`);
    }
    
    fs.writeFileSync(outputPath, mdxContent, "utf8");
    console.log(`   ✅ Created: ${outputPath}`);
    
    // Add to index
    projectIndex.push({
      slug: slug,
      title: frontmatter.title,
      date: frontmatter.date || frontmatter.timeframe,
      excerpt: frontmatter.excerpt || frontmatter.summary,
      tags: frontmatter.tags,
    });
  }
  
  // Write index file
  fs.writeFileSync(
    INDEX_FILE,
    JSON.stringify(projectIndex, null, 2),
    "utf8"
  );
  console.log(`\n📋 Created index: ${INDEX_FILE}`);
  
  console.log(`\n✨ Migration complete! ${projects.length} project(s) migrated.`);
  console.log("\n📌 Next steps:");
  console.log("   1. Review the generated MDX files in content/projects/");
  console.log("   2. Fill in missing frontmatter fields (client, role, tools, problem, outcome)");
  console.log("   3. Clean up and format the content as needed");
  console.log("   4. Add images and update image paths");
}

// Run migration
migrate().catch((error) => {
  console.error("❌ Migration failed:", error);
  process.exit(1);
});

