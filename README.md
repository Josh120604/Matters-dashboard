# Matters Dashboard

A responsive dashboard for tracking and managing legal matters. Built as a frontend assessment project using React, Next.js and Tailwind CSS.

---

## What it does

You get a clean list of matters — each one showing its title, who it's assigned to, when it's due, its status and priority level. From there you can search, filter and sort to find exactly what you're looking for.

- Search by title or person's name
- Filter by status and priority
- Sort by due date or priority level
- Skeleton loading screen while data comes in
- Friendly empty state when nothing matches your search
- Works on mobile and desktop

---

## Bonus features

- **Debounced search** — waits until you stop typing before filtering, rather than firing on every single keystroke
- **Sorting** — reorder matters by due date or priority level
- **Skeleton loaders** — animated placeholder cards while data loads, instead of a generic spinner

---

## Tech used

- Next.js
- React
- Tailwind CSS

---

## Running it locally

Clone the repo and install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project structure

```
matters-dashboard/
  app/
    components/
      MatterCard.jsx      # One card for one matter
      SkeletonCard.jsx    # The animated loading placeholder card
    page.jsx              # Everything comes together here
    layout.jsx            # Root layout
  data/
    matters.js            # The mocked matters data
```

---

## Why I built it this way

**I didn't want to over-engineer it.** This is a single view with a list — it didn't need a state management library or multiple routes. Keeping the filter and sort logic in `page.jsx` makes it straightforward to follow from top to bottom.

**The data is mocked but the loading feels real.** The data lives in a plain JS array and gets loaded inside a `useEffect` with a short delay — the same way you'd swap in a real `fetch()` call to an API. That way the loading state actually triggers and you can see how it behaves.

**Debounced search.** The input updates its own state on every keystroke, but the actual filter only runs 300ms after you stop typing. It's a small thing but it matters — if this were hitting a real API you wouldn't want a request firing on every single character typed.

**Sorting priority was a little tricky.** JavaScript doesn't know that High outranks Medium outranks Low — they're just words to it. So I mapped each word to a number and sorted by that instead. Simple fix but worth explaining.

**Skeleton loaders instead of a spinner.** Skeleton cards feel much less jarring than a spinner because they give you a sense of the layout before the content loads in. It's also just a nicer experience overall.

**Colour coded badges.** Status and priority both get their own colour — green for done, red for high priority and so on. You can scan the whole list without having to read every word.

---

## If I had more time

I'd add dark mode, some subtle animations when cards filter in and out, and localStorage to remember your filter settings between sessions. I left those out to keep the code clean and focused rather than trying to cram everything in.
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
