import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  category: string;
  excerpt: string;
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const posts = await Promise.all(
    files
      .filter((f) => f.endsWith('.mdx'))
      .map(async (file) => {
        const raw = await fs.readFile(path.join(BLOG_DIR, file), 'utf-8');
        const { data } = matter(raw);
        return {
          slug: file.replace(/\.mdx$/, ''),
          title: data.title as string,
          date: data.date as string,
          image: data.image as string,
          category: data.category as string,
          excerpt: data.excerpt as string,
        };
      })
  );
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<{ meta: BlogPost; content: string }> {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(file, 'utf-8');
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title as string,
      date: data.date as string,
      image: data.image as string,
      category: data.category as string,
      excerpt: data.excerpt as string,
    },
    content,
  };
}
