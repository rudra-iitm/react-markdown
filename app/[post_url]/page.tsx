import fs from 'fs';
import path from 'path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import readingTime from 'reading-time';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PostPage({ params }: any) {
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
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-6">{metadata.title}</h1>
      <p className="text-gray-600 font-semibold mb-6">🕛 {metadata.readingTime} minute read</p>
      <div className="prose prose-lg text-xl max-w-none fonr-bold">
        <MarkdownRenderer content={content} />
      </div>
    </main>
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