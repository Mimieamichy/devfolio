'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
// No longer import getRecentPosts here
import type { PostMeta } from '@/lib/blog';
// Removed useEffect, useState
import { Skeleton } from '../ui/skeleton'; // Keep Skeleton for potential future use or remove if not needed

interface BlogPreviewSectionProps {
  posts: PostMeta[]; // Accept posts as a prop
}

const BlogPreviewSection = ({ posts }: BlogPreviewSectionProps) => {
  // Removed useState for posts and loading

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      },
    },
  };

   const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5
      }
    },
     hover: {
        scale: 1.03,
        transition: { duration: 0.3 }
     }
  };

  // Determine loading state based on prop availability (though ideally data is always present)
  const loading = !posts; // Simple check, adjust if needed

  return (
    <section id="blog-preview" className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20 bg-secondary/50 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-primary">Recent Blog Posts</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        >
        {/* Conditional rendering based on posts prop */}
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <motion.div key={post.slug} variants={cardVariants} whileHover="hover">
              <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl hover:text-accent transition-colors">
                     <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/70 line-clamp-3">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-4 md:p-6 border-t">
                  <Button variant="link" className="p-0 h-auto text-accent" asChild>
                    <Link href={`/blog/${post.slug}`}>
                      Read More <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
           // Show message if no posts, or skeletons if loading state was kept
           <p className="text-center col-span-full text-muted-foreground">No blog posts found yet.</p>
        // Example of keeping skeleton logic if needed:
        // loading ? (
        //    Array.from({ length: 3 }).map((_, index) => (
        //       <motion.div key={`skel-${index}`} variants={cardVariants}>
        //          <Card className="overflow-hidden h-full flex flex-col shadow-md">
        //             <CardHeader>
        //                 <Skeleton className="h-6 w-3/4 mb-2" />
        //                 <Skeleton className="h-4 w-1/2" />
        //             </CardHeader>
        //             <CardContent className="flex-grow">
        //                 <Skeleton className="h-4 w-full mb-2" />
        //                  <Skeleton className="h-4 w-5/6" />
        //             </CardContent>
        //             <CardFooter className="p-4 md:p-6 border-t">
        //                <Skeleton className="h-8 w-24" />
        //             </CardFooter>
        //          </Card>
        //       </motion.div>
        //    ))
        // ) : (
        //    <p className="text-center col-span-full text-muted-foreground">No blog posts found yet.</p>
        // )
        )}
      </motion.div>
       {posts && posts.length > 0 && (
        <div className="text-center mt-12">
            <Button asChild variant="outline">
                <Link href="/blog">
                    View All Posts <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
       )}
    </section>
  );
};

export default BlogPreviewSection;
