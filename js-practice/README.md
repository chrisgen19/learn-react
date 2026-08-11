# js-practice

Plain JavaScript. No React, no npm, no build step, no framework.

The point is to close one specific gap: modern array methods and the habit of
not mutating data. Those are plain JS features that React leans on heavily, so
struggling with `setTodos([...todos, newTodo])` is usually a JavaScript gap
rather than a React one.

## 01-array-drills

Eight short exercises over a realistic array of objects.

```bash
node 01-array-drills/drills.js
```

Fill in one answer, run the file, see the result, move on. Run it after every
single drill. `solutions.js` sits next to it, but do not open it until you have
attempted all eight.

Drills 5 and 8 are the important ones. Both are about leaving the original
array untouched, which is the exact rule that decides whether React redraws
your screen.

Time: about an hour.

## 02-vanilla-todo

The same todo app from `../react-todo`, rebuilt with no React.

```bash
# no server needed, just open it
xdg-open 02-vanilla-todo/index.html
```

The HTML and CSS are done. `app.js` has the structure with `TODO` comments
where the logic goes. Keep DevTools open so you see errors as they happen.

You already know exactly what this app should do, so none of your attention
goes to figuring out requirements. All of it goes to JavaScript.

The thing to notice: you have to call `render()` yourself after every change.
Forget once and the screen quietly disagrees with your data. That is the
problem React exists to solve, and feeling it directly is worth more than any
explanation.

Time: an evening, plus the stretch goals.

## Order

Do the drills first. The todo app assumes the array methods are already
comfortable, and it says so - it asks you to use `map` and `filter` rather
than `for` loops, specifically because you will have just practiced them.

## Then

Go back and reread `../react-todo/src/App.tsx`. It should read differently.
