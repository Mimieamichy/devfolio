
export interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    imageHint: string;
    tags: string[];
    liveUrl: string;
    repoUrl: string;
  }
  
  export const projectsData: Project[] = [
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
      tags: ['Nextjs', 'TypeScript', 'TailwindCSS', 'Zod', 'Firebase'],
      liveUrl: 'https://taskify-alpha-rust.vercel.app/',
      repoUrl: 'https://github.com/Mimieamichy/taskify',
    },
    {
      id: 4,
      title: 'Project Delta',
      description: 'A modern web-based implementation of the classic Ludo board game, built with Next.js, Tailwind CSS, TypeScript, and Shadcn UI.',
      imageUrl: '/ludogame.png',
      imageHint: 'a ludo game',
      tags: ['Nextjs', 'TypeScript', 'TailwindCSS', 'Shadcn UI', 'Lucide Icons'],
      liveUrl: 'https://ludogame-one.vercel.app/', // Replace with actual live URL if available
      repoUrl: 'https://github.com/Mimieamichy/ludogame', // Replace with actual repo URL if available
    },
  ];
  