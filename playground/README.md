# React Learning Playground

A single Vite + React app used to learn React, one topic at a time.

## Run

```bash
cd playground
npm install      # first time only
npm run dev      # http://localhost:5173, hot-reloads on save
```

Other scripts: `npm run build` (production build), `npm run preview` (serve the build), `npm run lint`.

## How it's organized

```
src/
  App.jsx                # "switchboard" — renders whichever topic you're working on
  topics/
    01-jsx-lists/ShoppingList.jsx
    02-usestate/Counter.jsx
    ...
```

`App.jsx` just imports one topic component and returns it:

```jsx
// import ShoppingList from './topics/01-jsx-lists/ShoppingList'
import Counter from './topics/02-usestate/Counter'

function App() {
  return <Counter />
}

export default App
```

## Adding a new topic

1. `mkdir src/topics/NN-topic-name`
2. Add a component file with a default export, e.g. `MyDemo.jsx`:
   ```jsx
   export default function MyDemo() {
     return <div>...</div>
   }
   ```
3. In `App.jsx`, swap the import + the returned component to point at it.
4. Commit: `git commit -m "feat(topics): add NN-topic-name"`

Old topics aren't deleted — flip the comments in `App.jsx` to revisit any of them.

## Topics

| # | Folder | Concepts |
|---|--------|----------|
| 00 | `00-file-fetch` | Custom topic slot — `useEffect`, `fetch`, `AbortController`, loading/error/empty states, CSS Modules |
| 01 | `01-jsx-lists` | JSX, `.map()` to render lists, `key`, inline `style` |
| 02 | `02-usestate` | `useState`, event handlers, re-rendering |

## Later

Once there are ~5+ topics, add `react-router-dom` so each topic is a route with a nav menu instead of editing `App.jsx`.

---

> The standalone `*.html` files in the parent directory are a separate no-build sandbox (React via CDN + in-browser Babel) — handy for quick experiments, not used by this Vite app.
