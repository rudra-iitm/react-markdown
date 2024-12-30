import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import readingTime from 'reading-time';
import { AuthorSidebar } from "@/components/author-sidebar"
import { TocSidebar } from "@/components/toc-sidebar";

const author = {
  name: "Till Kamppeter",
  role: "OpenPrinting Project Leader",
  location: "Vienna, Austria",
  image: "/placeholder.svg?height=128&width=128",
  email: "till@example.com",
  github: "https://github.com/till",
}

const tableOfContents = [
  {
    title: "Festa do Software Livre/UbuCon Portugal 2024",
    href: "#festa",
    current: true,
  },
  {
    title: "Ubuntu Summit 2024 in the Hague",
    href: "#summit",
  },
  {
    title: "4 times in Podcast Ubuntu Portugal",
    href: "#podcast",
  },
  {
    title: "Google Summer of Code 2024",
    href: "#gsoc",
  },
  {
    title: "New Releases",
    href: "#releases",
  },
]

export default async function PostPage({ params }: { params: { post_url: string } }) {
  const { post_url } = params;
  const markdownPath = path.join(process.cwd(), 'content', `${post_url}.md`);
  let content = '';
  let metadata: { title?: string; readingTime?: string } = {};

  try {
    const mdContent = fs.readFileSync(markdownPath, 'utf8');
    ({ metadata, content } = parseMetadata(mdContent));
  } catch (error) {
    console.error('Error reading markdown file:', error);
    content = 'Error loading content.';
  }

  return (
    <div className="flex min-h-screen">
      <AuthorSidebar author={author} />
        <main className="container mx-auto px-4 py-8 max-w-2xl text-gray-100 min-h-screen">
          <h1 className="text-4xl font-bold mb-6 text-white">{metadata.title}</h1>
          <p className="text-gray-400 font-semibold mb-6">🕛 {metadata.readingTime} minute read</p>
          <div className="prose prose-lg text-xl max-w-none prose-invert">
            <MarkdownRenderer content={content} />
          </div>
        </main>
      <TocSidebar items={tableOfContents} />
    </div>
  );
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);

  return files.map((file) => ({
    post_url: file.replace(/\.md$/, ''),
  }));
}

function parseMetadata(content: string) {
  const metadataRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(metadataRegex);
  
  if (!match) {
    throw new Error("No metadata found in the content.");
  }

  const metadataContent = match[1];
  const metadataLines = metadataContent.split('\n');
  const metadata: { [key: string]: string } = {};

  metadataLines.forEach(line => {
    const [key, ...valueParts] = line.split(':');
    const value = valueParts.join(':').trim();
    if (key) {
      metadata[key.trim()] = value;
    }
  });

  const stats = readingTime(content.replace(metadataRegex, ''));
  metadata.readingTime = Math.round(stats.minutes).toString();

  return {
    metadata,
    content: content.replace(metadataRegex, ''),
  };
}
