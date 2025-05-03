/**
 * Represents a GitHub repository contribution. (Example structure)
 * A real implementation might fetch weekly data.
 */
export interface GitHubContributionDay {
  date: string; // YYYY-MM-DD
  contributionCount: number;
  color: string; // Hex color code (e.g., #ebedf0, #9be9a8, ...)
}

export interface GitHubContributionWeek {
    contributionDays: GitHubContributionDay[];
}

/**
 * Asynchronously retrieves contribution data from GitHub.
 * This is a placeholder. A real implementation requires fetching from GitHub's API
 * or using a scraping library carefully, respecting GitHub's terms of service.
 * Fetching detailed contribution data might require authentication or specific API endpoints.
 *
 * @param username The GitHub username for whom to retrieve contribution data.
 * @returns A promise that resolves to an array of GitHubContributionWeek objects (or similar structure).
 */
export async function getGitHubContributions(username: string): Promise<GitHubContributionWeek[]> {
  console.warn(`GitHub contribution fetching for ${username} is using placeholder data. Implement actual API call.`);

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Generate placeholder data mimicking the structure of GitHub's contribution graph (weeks and days)
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 365); // Approx one year back

  const weeks: GitHubContributionWeek[] = [];
  let currentWeek: GitHubContributionDay[] = [];
  let currentDate = new Date(startDate);

  // Adjust start date to the beginning of the week (Sunday)
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());


  while (currentDate <= endDate) {
     const contributionCount = Math.floor(Math.random() * 15); // 0 to 14 contributions
     let color = '#ebedf0'; // Default: no contributions
      if (contributionCount > 0 && contributionCount <= 3) color = '#9be9a8';
      else if (contributionCount > 3 && contributionCount <= 6) color = '#40c463';
      else if (contributionCount > 6 && contributionCount <= 9) color = '#30a14e';
      else if (contributionCount > 9) color = '#216e39';

      currentWeek.push({
          date: currentDate.toISOString().split('T')[0],
          contributionCount: contributionCount,
          color: color
      });

      if (currentDate.getDay() === 6) { // Saturday is the end of the week
          weeks.push({ contributionDays: [...currentWeek] });
          currentWeek = [];
      }

      currentDate.setDate(currentDate.getDate() + 1);
  }

   // Add the last partial week if it exists
   if (currentWeek.length > 0) {
     // Pad the remaining days of the week if needed (optional, depends on desired display)
      // while (currentWeek.length < 7) {
      //     currentWeek.push({ date: 'pad', contributionCount: -1, color: 'transparent' }); // Example padding
      // }
     weeks.push({ contributionDays: currentWeek });
   }


  // Return data for the last 52 weeks (approx)
  return weeks.slice(-53); // Return roughly one year (52/53 weeks)
}
