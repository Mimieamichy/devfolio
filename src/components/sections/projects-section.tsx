
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { projectsData } from '@/lib/projects-data'; // Import shared project data

const MAX_PROJECTS_HOMEPAGE = 3;
const displayedProjects = projectsData.slice(0, MAX_PROJECTS_HOMEPAGE);
const showSeeMoreButton = projectsData.length > MAX_PROJECTS_HOMEPAGE;

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
        {displayedProjects.map((project) => (
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
      {showSeeMoreButton && (
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button asChild size="lg">
            <Link href="/projects">
              All Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      )}
    </section>
  );
};

export default ProjectsSection;
