"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Database,
  GitBranch,
  Palette,
  Smartphone,
  Wind,
} from "lucide-react"; // Example icons
import { motion } from "framer-motion";

const skills = [
  { name: "JavaScript", icon: Code },
  { name: "React", icon: Code },
  { name: "Next.js", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "Redux Toolkit", icon: Database }, // Using Database icon as placeholder
  { name: "Git", icon: GitBranch },
  { name: "TailwindCSS", icon: Palette }, // Using Palette icon
  { name: "Responsive Design", icon: Smartphone },
  { name: "Web Performance", icon: Wind }, // Using Wind icon
];

const AboutSection = () => {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    hover: {
      scale: 1.1,
      
    },
  };

  return (
    <motion.section
      id="about"
      className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={cardVariants}>
        <Card className="w-full max-w-4xl mx-auto shadow-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-center text-foreground/80">
              I'm a passionate Frontend Developer with 4 years of experience
              crafting engaging and user-friendly web experiences. I thrive on
              turning complex problems into elegant solutions and continuously
              learning new technologies. My expertise lies in the modern
              JavaScript ecosystem, particularly with React and its powerful
              frameworks like Next.js.
            </p>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4 text-primary">
                My Skills
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 17,
                      delay: index * 0.05,
                    }}
                  >
                    <Badge
                      variant="secondary"
                      className="text-base px-4 py-2 rounded-full shadow-md border border-accent/50 bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <skill.icon className="mr-2 h-4 w-4" />
                      {skill.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
