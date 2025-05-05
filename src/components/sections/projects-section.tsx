'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Placeholder projects data - In a real app, this would come from Redux store/API
const projects = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A modern review platform built with React.js, TypeScript, and Paystack integration.',
    imageUrl: '/jafis.png',
    imageHint: 'review website',
    tags: ['React.js', 'TypeScript', 'TailwindCSS', 'Paystack'],
    liveUrl: 'https://jafiai.vercel.app/',
    repoUrl: 'https://github.com/Mimieamichy/jafi',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'A simple personal blog built with Nextjs, Markdown, and TailwindCSS, focusing on performance.',
    imageUrl: '/markdownblog.png',
    imageHint: 'Markdown blog website',
    tags: ['Nextjs', 'TypeScript', 'tailwindCss', 'Markdown', 'SEO'],
    liveUrl: 'https://markdownblog-swart.vercel.app/',
    repoUrl: 'https://github.com/Mimieamichy/markdownblog',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'Your simple and stylish Todo App, built with Nextjs, TailwindCSS, Zod and React focusing on performance.',
    imageUrl: '/taskify.png',
    imageHint: 'Todo App',
    tags: ['Nextjs', 'TypeScript', 'TailwindCSS', 'Zod'],
    liveUrl: 'https://taskify-alpha-rust.vercel.app/',
    repoUrl: 'https://github.com/Mimieamichy/taskify',
  },
];

const ProjectsSection = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

   const cardVariants = {
    hidden: { y: 50, opacity: 0 },
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
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
         transition: { duration: 0.3 }
     }
  };

  return (
    <section id="projects" className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <h2 className="text-3xl font-bold text-center mb-10 md:mb-12 text-primary">My Projects</h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        >
        {projects.map((project) => (
          <motion.div key={project.id} variants={cardVariants} whileHover="hover">
             <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
               <CardHeader className="p-0">
                 <Image
                   src={project.imageUrl}
                   alt={project.title}
                   width={400}
                   height={250}
                   className="object-cover w-full h-48"
                   data-ai-hint={project.imageHint}
                 />
               </CardHeader>
               <CardContent className="p-4 md:p-6 flex-grow">
                 <CardTitle className="mb-2 text-xl md:text-2xl">{project.title}</CardTitle>
                 <CardDescription className="mb-4 text-foreground/70">{project.description}</CardDescription>
                 <div className="flex flex-wrap gap-2">
                   {project.tags.map((tag) => (
                     <Badge key={tag} variant="secondary">{tag}</Badge>
                   ))}
                 </div>
               </CardContent>
               <CardFooter className="p-4 md:p-6 flex justify-end gap-2 border-t">
                 <Button variant="outline" size="sm" asChild>
                   <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                     <Github className="mr-2 h-4 w-4" /> GitHub
                   </Link>
                 </Button>
                 <Button size="sm" asChild>
                   <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
};

export default ProjectsSection;
