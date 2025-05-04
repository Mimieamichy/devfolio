import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Replace with your actual social links
  const socialLinks = [
    {
      label: "GitHub",
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/Mimieamichy",
    },
    {
      label: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/miracle-amarachy-ezeh-078516278/",
    },
    {
      label: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      href: "https://x.com/js_mimie",
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-20 md:flex-row md:py-0">
        <div className="text-center text-sm leading-loose md:text-left ml-10">
          © {currentYear} Mae Techs. All rights reserved.{" "}
          {/* Update with your name */}
        </div>
        <div className="flex items-center ml-10 gap-2">
          {socialLinks.map((link) => (
            <Button key={link.label} variant="ghost" size="icon" asChild>
              <Link href={link.href} target="_blank" rel="noopener noreferrer">
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
