'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Update with your details
  const name = "Your Name Here";
  const title = "Frontend Developer";
  const intro = "Specializing in building modern, responsive, and performant web applications using JavaScript, React, Next.js, and TypeScript.";
  const resumeLink = "/your-resume.pdf"; // Link to your resume PDF in the public folder

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <section id="home" className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <motion.div
        className="container px-4 md:px-6 grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col justify-center space-y-4">
          <motion.div className="space-y-2" variants={itemVariants}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
              {name}
            </h1>
            <p className="text-xl text-muted-foreground md:text-2xl">
              {title}
            </p>
          </motion.div>
          <motion.p
            className="max-w-[600px] text-foreground/80 md:text-xl"
            variants={itemVariants}
          >
            {intro}
          </motion.p>
          <motion.div className="flex flex-col gap-2 min-[400px]:flex-row" variants={itemVariants}>
            <Button size="lg" asChild>
              <Link href="#projects">
                View Projects <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href={resumeLink} target="_blank" download>
                Download Resume <Download className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <Button variant="outline" size="lg" asChild>
                <Link href="#contact">
                    Contact Me
                </Link>
             </Button>
          </motion.div>
        </div>
         <motion.div
            className="flex justify-center items-center"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
          <Image
            src="https://picsum.photos/600/600" // Placeholder image
            alt="Your Name - Profile Picture"
            width={400}
            height={400}
            className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-[400px] lg:order-last lg:aspect-square shadow-lg border-4 border-accent"
            data-ai-hint="professional developer portrait"
          />
         </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
