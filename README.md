# learn-react

Personal React refresher — single-file HTML scaffolds covering core hooks, patterns, and modern APIs. No build step, no install. Just open in a browser.

Uses React 18 + Babel Standalone + Tailwind CDN.

## Files

- **`react-components.html`** — 21 mini-demos covering React fundamentals → modern APIs.
- **`react-1.html`** — earliest scratchpad.

## Run it

```bash
# any static server works, e.g.:
python3 -m http.server 8000
# then open http://localhost:8000/react-components.html
```

Or just double-click the `.html` file.

## Topics covered (`react-components.html`)

| # | Topic |
|---|---|
| 01 | Components & JSX |
| 02 | Props (with defaults) |
| 03 | `useState` |
| 04 | `useEffect` |
| 05 | Conditional rendering |
| 06 | Lists & keys |
| 07 | Forms & controlled inputs |
| 08 | Lifting state up |
| 09 | `useContext` |
| 10 | `useRef` |
| 11 | `useReducer` |
| 12 | Custom hooks (`useToggle`) |
| 13 | `useMemo` |
| 14 | `useCallback` + `React.memo` |
| 15 | Children & composition |
| 16 | Fragments |
| 17 | Portals |
| 18 | Async fetch (loading/error/empty states) |
| 19 | `useId` |
| 20 | `useTransition` |
| 21 | Error Boundary |

## Notes

- Demo #18 hits `jsonplaceholder.typicode.com` — needs internet.
- Error Boundary is a class component (still required pre-React 19).
- This is intentionally a single-file scaffold for fast iteration. For real projects, scaffold with Vite or Next.js.
