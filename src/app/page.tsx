import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ProjectsSection from '@/components/sections/projects-section';
import BlogPreviewSection from '@/components/sections/blog-preview-section';
import GitHubActivitySection from '@/components/sections/github-activity-section';
import ContactSection from '@/components/sections/contact-section';
import { Separator } from '@/components/ui/separator';
import { getRecentPosts } from '@/lib/blog'; // Import the fetch function

export default async function Home() {
  // Replace with your actual GitHub username
  const githubUsername = "octocat";

  // Fetch recent posts on the server
  const recentPosts = await getRecentPosts(3);

  return (
    <div className="flex flex-col">
      <HeroSection />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <AboutSection />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <ProjectsSection />
      <Separator className="my-12 md:my-16 lg:my-20" />
      {/* Pass fetched posts as props */}
      <BlogPreviewSection posts={recentPosts} />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <GitHubActivitySection username={githubUsername} />
      <Separator className="my-12 md:my-16 lg:my-20" />
      <ContactSection />
    </div>
  );
}
