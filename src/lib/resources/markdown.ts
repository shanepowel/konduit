import fs from "fs";
import path from "path";
import matter from "gray-matter";

const resourcesDir = path.join(process.cwd(), "content/resources");

export function getResourceMarkdown(slug: string) {
  const filePath = path.join(resourcesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(raw);
  return { content, frontmatter: data as { title: string; summary: string } };
}
