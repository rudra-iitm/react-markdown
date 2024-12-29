import fs from 'fs/promises';
import path from 'path';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';

export default async function Home() {
  const markdownPath = path.join(process.cwd(), 'content', 'sample.md');
  const markdownContent = await fs.readFile(markdownPath, 'utf8');

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Markdown Renderer</h1>
      <div className="prose prose-lg max-w-none">
        <MarkdownRenderer content={markdownContent} />
      </div>
    </main>
  );
}
