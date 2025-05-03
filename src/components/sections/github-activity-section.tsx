'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'framer-motion';
// Assume getGitHubContributions is correctly implemented in services
// import { getGitHubContributions, type GitHubContribution } from '@/services/github';

interface GitHubActivitySectionProps {
  username: string;
}

// Placeholder function until actual API call is implemented
async function getGitHubContributionsPlaceholder(username: string): Promise<any[]> {
    console.log(`Fetching contributions for ${username}... (Placeholder)`);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    // Simulate some contribution data structure
    // A real implementation would fetch weekly contribution counts
    const weeks = Array.from({ length: 52 }).map((_, weekIndex) => ({
        contributionDays: Array.from({ length: 7 }).map((_, dayIndex) => ({
            date: `2024-week-${weekIndex}-day-${dayIndex}`, // Placeholder date
            contributionCount: Math.floor(Math.random() * 15), // Random count
            color: `hsl(175, 53%, ${90 - Math.floor(Math.random() * 50)}%)` // Shades of teal/gray
        }))
    }));
    return weeks;
}


const GitHubActivitySection = ({ username }: GitHubActivitySectionProps) => {
  // Using 'any' for placeholder data structure
  const [contributions, setContributions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use the placeholder function
        const data = await getGitHubContributionsPlaceholder(username);
        setContributions(data);
      } catch (err) {
        console.error('Failed to fetch GitHub contributions:', err);
        setError('Could not load GitHub activity.');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [username]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.01 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="github-activity" className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
      <Card className="w-full max-w-4xl mx-auto shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-primary">GitHub Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          {loading ? (
            <div className="flex flex-col space-y-1">
               {Array.from({ length: 7 }).map((_, i) => (
                    <div key={i} className="flex space-x-1">
                      {Array.from({ length: 52 }).map((_, j) => (
                           <Skeleton key={`${i}-${j}`} className="h-3 w-3 rounded-sm" />
                      ))}
                    </div>
               ))}
            </div>
          ) : error ? (
            <p className="text-center text-destructive">{error}</p>
          ) : contributions.length > 0 ? (
            <motion.div
              className="flex flex-col space-y-1 overflow-x-auto pb-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
               {/* Render rows for days of the week */}
               {Array.from({ length: 7 }).map((_, dayIndex) => (
                 <div key={dayIndex} className="flex space-x-1">
                   {/* Render columns for weeks */}
                    {contributions.map((week, weekIndex) => {
                        const dayData = week.contributionDays[dayIndex];
                        if (!dayData) return <div key={`${weekIndex}-${dayIndex}-empty`} className="h-3 w-3 rounded-sm bg-secondary" />; // Placeholder for missing data

                        // Determine opacity based on count, or use color directly if provided
                        const opacity = dayData.contributionCount === 0 ? 0.1 : Math.min(1, 0.2 + (dayData.contributionCount / 10)); // Example logic

                        return (
                           <motion.div
                                key={dayData.date}
                                className="h-3 w-3 rounded-sm"
                                style={{ backgroundColor: dayData.color || `hsl(var(--accent) / ${opacity})` }}
                                variants={itemVariants}
                                title={`${dayData.contributionCount} contributions on ${new Date(dayData.date).toLocaleDateString()}`} // Basic tooltip
                           />
                        );
                   })}
                 </div>
               ))}
            </motion.div>
          ) : (
            <p className="text-center text-muted-foreground">No contribution data available.</p>
          )}
           <p className="text-xs text-muted-foreground text-center mt-4">
             Contribution graph (placeholder data).
             <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="underline ml-1 text-accent hover:text-accent/80">
                View on GitHub
             </a>
           </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default GitHubActivitySection;
