const fs = require("fs");
const path = require("path");

/**
 * Cleanup script to remove WordPress shortcodes from existing MDX files
 */

const projectsDir = path.join(__dirname, "../content/projects");

function cleanContent(content) {
  if (!content) return "";
  
  let cleaned = content;
  
  // Remove ALL WordPress shortcodes (Divi Builder, etc.)
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

function cleanupFile(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  
  // Split frontmatter and content
  const frontmatterEnd = content.indexOf("---\n", 4);
  if (frontmatterEnd === -1) {
    console.log(`⚠️  Skipping ${path.basename(filePath)} - no frontmatter found`);
    return;
  }
  
  const frontmatter = content.substring(0, frontmatterEnd + 4);
  const body = content.substring(frontmatterEnd + 4);
  
  // Clean the body content
  const cleanedBody = cleanContent(body);
  
  // Only write if content changed significantly (more than just whitespace)
  const originalBodyTrimmed = body.replace(/\s/g, "");
  const cleanedBodyTrimmed = cleanedBody.replace(/\s/g, "");
  
  if (originalBodyTrimmed !== cleanedBodyTrimmed && cleanedBodyTrimmed.length > 0) {
    const newContent = frontmatter + "\n\n" + cleanedBody;
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`✅ Cleaned: ${path.basename(filePath)}`);
    return true;
  } else if (cleanedBodyTrimmed.length === 0) {
    // If cleaned content is empty, add a placeholder
    const placeholder = "\n\nThis project content needs to be manually migrated from WordPress. The original content contained WordPress shortcodes that cannot be automatically converted to MDX.\n\nPlease review the WordPress export and recreate this case study using the case study template components.";
    const newContent = frontmatter + placeholder;
    fs.writeFileSync(filePath, newContent, "utf8");
    console.log(`⚠️  Placeholder added: ${path.basename(filePath)} (content was all shortcodes)`);
    return true;
  }
  
  return false;
}

function main() {
  console.log("🧹 Cleaning WordPress shortcodes from MDX files...\n");
  
  if (!fs.existsSync(projectsDir)) {
    console.error(`❌ Projects directory not found: ${projectsDir}`);
    process.exit(1);
  }
  
  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith(".mdx"));
  
  if (files.length === 0) {
    console.log("No MDX files found to clean.");
    return;
  }
  
  let cleanedCount = 0;
  
  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    if (cleanupFile(filePath)) {
      cleanedCount++;
    }
  }
  
  console.log(`\n✨ Cleanup complete! ${cleanedCount} file(s) updated.`);
  console.log("\n📌 Note: Some content may need manual review and formatting.");
}

main();

