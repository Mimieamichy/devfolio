// src/app/blog/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllPosts } from '@/lib/blog'; // Assume this function exists
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog - DevFolio',
  description: 'Read articles and tutorials about frontend development, React, Next.js, and more.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <h1 className="text-4xl font-bold text-center mb-10 md:mb-12 text-primary">Blog</h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Card key={post.slug} className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-xl md:text-2xl hover:text-accent transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-foreground/70 line-clamp-4">{post.excerpt}</p> {/* Show more lines here */}
              </CardContent>
              <CardFooter className="p-4 md:p-6 border-t">
                <Button variant="link" className="p-0 h-auto text-accent" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No blog posts published yet. Check back soon!</p>
      )}
    </div>
  );
}
