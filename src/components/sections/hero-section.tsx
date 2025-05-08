'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Update with your details

  
  const name = "Miracle Ezeh";
  const title = "Frontend Developer";
  const intro = "Specializing in building modern, responsive, and performant web applications using JavaScript, React, Next.js, and TypeScript.";
  const resumeLink = "/CV_II.pdf"; // Link to your resume PDF in the public folder

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
      className="container px-4 md:px-6 grid gap-12 lg:grid-cols-2 items-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Text Section */}
      <div className="flex flex-col justify-center md:ml-20 space-y-6">
        <motion.div className="space-y-2" variants={itemVariants}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-primary">
            {name}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">{title}</p>
        </motion.div>
        
        <motion.p
          className="text-base md:text-lg text-foreground/80 max-w-prose"
          variants={itemVariants}
        >
          {intro}
        </motion.p>
  
        <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
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
  
      {/* Image Section */}
      <motion.div
        className="flex justify-center lg:justify-end"
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Image
          src="/myImage.jpeg"
          alt="Amichy - Profile Picture"
          width={400}
          height={400}
          className="rounded-full object-cover border-4 border-accent shadow-xl w-60 h-60 sm:w-72 sm:h-72 lg:w-96 lg:h-96"
        />
      </motion.div>
    </motion.div>
  </section>
  
  );
};

export default HeroSection;
