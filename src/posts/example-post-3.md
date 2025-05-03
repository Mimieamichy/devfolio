---
title: 'Understanding React Hooks: useState and useEffect'
date: '2024-07-10T09:15:00.000Z'
excerpt: 'A fundamental look at two of the most essential React Hooks: useState for managing component state and useEffect for handling side effects.'
tags: ['React', 'Hooks', 'JavaScript', 'State Management']
---

## Introduction

React Hooks, introduced in React 16.8, revolutionized how we write functional components by allowing them to manage state and lifecycle features. Let's dive into `useState` and `useEffect`.

## `useState`: Managing Component State

The `useState` Hook lets you add state variables to functional components.

```jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable 'count' initialized to 0
  // 'setCount' is the function to update 'count'
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      {/* Update state on button click */}
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

- `useState` returns an array with two elements: the current state value and a function to update it.
- Calling the update function (e.g., `setCount`) triggers a re-render of the component with the new state value.

## `useEffect`: Handling Side Effects

The `useEffect` Hook allows you to perform side effects in functional components. Side effects include data fetching, subscriptions, manually changing the DOM, etc.

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  // This effect runs after every render
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `Timer: ${seconds}s`;

    // Example of an effect with cleanup: setting up an interval
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function: runs when the component unmounts or before the effect runs again
    return () => {
      clearInterval(intervalId);
      console.log('Timer cleanup!');
    };
  }, []); // <-- Empty dependency array: effect runs only once after initial render

  return (
    <div>
      Seconds: {seconds}
    </div>
  );
}
```

- `useEffect` takes a function (the effect) as its first argument.
- The optional second argument is a **dependency array**:
    - **No array:** Effect runs after *every* render.
    - **Empty array (`[]`):** Effect runs only *once* after the initial render (like `componentDidMount`).
    - **Array with values (`[prop, state]`):** Effect runs after the initial render and whenever any value in the array changes.
- The function returned from the effect is the **cleanup function**, which runs before the component unmounts or before the effect re-runs.

## Conclusion

`useState` and `useEffect` are foundational Hooks for building dynamic React applications. Understanding them well is crucial for managing component state and interacting with the outside world effectively.
