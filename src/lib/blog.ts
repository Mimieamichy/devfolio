// src/lib/blog.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src', 'posts'); // Create this directory

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  // Add other metadata fields if needed, e.g., tags, author
}

export interface PostData {
  meta: PostMeta;
  content: string;
}

// Helper function to get slugs
export function getPostSlugs(): string[] {
    try {
      const fileNames = fs.readdirSync(postsDirectory);
      return fileNames.map((fileName) => fileName.replace(/\.md$/, ''));
    } catch (error) {
        console.warn("Could not read posts directory. Ensure 'src/posts' exists.", error);
        return []; // Return empty array if directory doesn't exist or is empty
    }
}

// Get data for a single post by slug
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  try {
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      // Basic validation
      if (!data.title || !data.date || !data.excerpt) {
          console.warn(`Post ${slug} is missing required frontmatter (title, date, excerpt)`);
          return null;
      }

      return {
        meta: {
          slug,
          title: data.title,
          date: data.date.toISOString(), // Ensure date is a string (ISO format)
          excerpt: data.excerpt,
          ...data, // Include any other frontmatter
        },
        content,
      };
  } catch (error) {
      console.error(`Error reading post ${slug}:`, error);
      return null; // Return null if file doesn't exist or error occurs
  }
}

// Get metadata for all posts, sorted by date
export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = getPostSlugs();
  const postsPromises = slugs.map(slug => getPostBySlug(slug));
  const postsData = await Promise.all(postsPromises);

  const validPosts = postsData
    .filter((post): post is PostData => post !== null) // Type guard to filter out nulls
    .map(post => post.meta); // Extract metadata

  // Sort posts by date in descending order
  return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}


// Get metadata for the most recent posts
export async function getRecentPosts(count: number): Promise<PostMeta[]> {
    const allPosts = await getAllPosts();
    return allPosts.slice(0, count);
}
