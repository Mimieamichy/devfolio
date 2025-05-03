import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ProjectsSection from '@/components/sections/projects-section';
// Removed BlogPreviewSection import
import GitHubActivitySection from '@/components/sections/github-activity-section';
import ContactSection from '@/components/sections/contact-section';
import { Separator } from '@/components/ui/separator';
// Removed getRecentPosts import

export default async function Home() {
  // Replace with your actual GitHub username
  const githubUsername = "octocat";

  // Removed fetching recent posts

  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <AboutSection />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <ProjectsSection />
      {/* Removed BlogPreviewSection and its Separator */}
      <Separator className="my-12 md:my-16 lg:my-20" />
      <GitHubActivitySection username={githubUsername} />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <ContactSection />
    </div>
  );
}
