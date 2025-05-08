'use client';

import { projectsData, type Project } from '@/lib/projects-data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// It's good practice to use server components for pages that fetch data or don't need client-side interactivity directly.
// Motion can be added to individual cards if needed, or the whole list, but keep it simple for a page listing.

// Animation variants (can be extracted to a shared file if used in multiple places)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Stagger animation for each card
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.3
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)", // Slightly softer shadow for hover
    transition: { duration: 0.2 }
  }
};


// As this page can be a server component, we import motion differently or wrap client components.
// For simplicity, we won't use framer-motion directly in this server component here to avoid making it client.
// If complex animations are needed, individual ProjectCard components could be client components.
// The motion import and usage below would make this a client component.
// To keep it server, remove motion or create a client ProjectCard.
// For this example, let's assume we want simple rendering on this page. If animations are crucial,
// you'd structure it with client components.

// For this iteration, let's make the page a client component to use motion.
// Add 'use client' if you intend to use framer-motion directly here.
// However, for a list page, it's often better for performance to keep it server and animate client-side cards.
// Let's proceed without 'use client' and framer-motion for the page itself for now, focusing on structure.
// If motion is a must, add 'use client' and import motion.

// Re-evaluating: User might expect similar animations. Let's use motion for consistency.


export default function AllProjectsPage() {
  return (
    <section id="all-projects" className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-16 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        All My Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate when the page loads
      >
        {projectsData.map((project: Project) => (
          <motion.div key={project.id} variants={cardVariants} whileHover="hover">
             <Card className="overflow-hidden h-full flex flex-col shadow-lg rounded-lg border border-border/20 hover:shadow-xl transition-all duration-300">
               <CardHeader className="p-0 relative">
                 <Image
                   src={project.imageUrl}
                   alt={project.title}
                   width={400}
                   height={250}
                   className="object-cover w-full h-48 md:h-56 rounded-t-lg" // Consistent height
                   data-ai-hint={project.imageHint}
                 />
               </CardHeader>
               <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
                 <CardTitle className="mb-2 text-xl md:text-2xl font-semibold">{project.title}</CardTitle>
                 <CardDescription className="mb-4 text-foreground/80 flex-grow">{project.description}</CardDescription>
                 <div className="flex flex-wrap gap-2 mt-auto pt-3">
                   {project.tags.map((tag) => (
                     <Badge key={tag} variant="secondary" className="text-xs px-2 py-1">{tag}</Badge>
                   ))}
                 </div>
               </CardContent>
               <CardFooter className="p-4 md:p-6 flex justify-end gap-2 border-t border-border/20">
                 <Button variant="outline" size="sm" asChild>
                   <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub repository for ${project.title}`}>
                     <Github className="mr-2 h-4 w-4" /> GitHub
                   </Link>
                 </Button>
                 <Button size="sm" asChild>
                   <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo of ${project.title}`}>
                     <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                   </Link>
                 </Button>
               </CardFooter>
             </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
