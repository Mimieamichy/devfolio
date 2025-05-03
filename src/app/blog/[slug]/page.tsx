// src/app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPosts, PostMeta } from '@/lib/blog';
import { Metadata } from 'next';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: { slug: string };
};

// Generate metadata dynamically based on the post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.meta.title} - DevFolio Blog`,
    description: post.meta.excerpt,
    // Add Open Graph tags for social sharing
    openGraph: {
        title: post.meta.title,
        description: post.meta.excerpt,
        type: 'article',
        publishedTime: post.meta.date,
        // url: `https://yourdomain.com/blog/${params.slug}`, // Add your domain
        // images: [ // Optional: Add a specific image for the post
        //   {
        //     url: `https://yourdomain.com/blog-images/${params.slug}.png`,
        //     alt: post.meta.title,
        //   }
        // ]
    },
  };
}

// Generate static paths for all blog posts at build time
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Trigger 404 page if post doesn't exist
  }

  return (
    <article className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 max-w-3xl">
       <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-accent" asChild>
           <Link href="/blog">
             <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
           </Link>
       </Button>
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-3">{post.meta.title}</h1>
        <p className="text-muted-foreground text-sm">
          Published on {new Date(post.meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>
      <Separator className="my-8" />
      {/* Basic Markdown rendering - customize styles via globals.css or prose classes */}
      <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-primary prose-a:text-accent hover:prose-a:text-accent/80 prose-strong:text-foreground prose-blockquote:border-accent prose-code:text-sm prose-code:bg-secondary prose-code:p-1 prose-code:rounded">
         <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
