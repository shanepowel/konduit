import ReactMarkdown from "react-markdown";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { buildMetadata, pageMetadata } from "@/components/seo/metadata";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getLegalContent(filename: string) {
  const filePath = path.join(process.cwd(), "content/legal", filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { content } = matter(raw);
  return content;
}

export const metadata = buildMetadata(pageMetadata.privacy);

export default function PrivacyPage() {
  const content = getLegalContent("privacy-policy.md");

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]}
      />
      <section className="section-gap bg-white">
        <div className="container-konduit max-w-3xl">
          <div className="prose-konduit">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </>
  );
}
