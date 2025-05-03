---
title: 'Getting Started with Next.js 14'
date: '2024-07-20T10:00:00.000Z'
excerpt: 'A quick guide to setting up your first Next.js 14 application using the App Router.'
tags: ['Next.js', 'React', 'Web Development', 'JavaScript']
---

## Introduction

Next.js continues to evolve, and version 14 (and beyond) solidifies the App Router as the recommended way to build applications. This post will walk you through the basic setup.

## Creating a New Project

The easiest way to start is using `create-next-app`:

```bash
npx create-next-app@latest my-nextjs-app --typescript --tailwind --eslint
cd my-nextjs-app
npm run dev
# or
yarn dev
# or
pnpm dev
```

This command scaffolds a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured.

## Understanding the App Router

The core concept of the App Router is the `app` directory.

- **`app/layout.tsx`**: Defines the root layout shared across all pages.
- **`app/page.tsx`**: Represents the content for the root route (`/`).
- **Folders**: Define route segments (e.g., `app/dashboard/page.tsx` maps to `/dashboard`).
- **`loading.tsx`**: Automatically shows while page content loads.
- **`error.tsx`**: Catches errors within a route segment.

## Server Components vs. Client Components

By default, components inside the `app` directory are **React Server Components (RSCs)**. They run on the server and help reduce the amount of JavaScript sent to the client.

If you need interactivity (event handlers, state, lifecycle effects), you need a **Client Component**. Opt into client rendering by adding the `"use client"` directive at the top of the file:

```typescript
"use client";

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Conclusion

Next.js with the App Router offers powerful features for building modern web applications. This is just the beginning! Explore features like Route Handlers (API routes), Server Actions, and advanced layouts to unlock its full potential.
