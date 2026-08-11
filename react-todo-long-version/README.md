# react-todo (long version)

The same todo app as `../react-todo`, written the long way on purpose.

Identical behaviour, identical dependencies. The only difference is that every
compact idiom has been unpacked into explicit steps, with comments explaining
what each one does and why.

## Why this exists

The short version is what you would actually ship, but it hides a lot of work
inside single lines. This line, for example:

```tsx
setTodos((currentTodos) => [...currentTodos, newTodo]);
```

is doing four separate things at once: passing a function as an argument,
receiving the current list, copying it into a brand new array, and appending to
that copy. Here that same operation is a loop you can read top to bottom.

## Where to look

Read the files in this order. Each one builds on the last.

| File | What it teaches |
| --- | --- |
| `src/types/todo.ts` | What a TypeScript type is, and that it vanishes at runtime |
| `src/main.tsx` | How a React app attaches to the HTML page |
| `src/App.tsx` | State, why we never mutate it, and localStorage |
| `src/components/TodoForm.tsx` | Controlled inputs, form submit, calling back up to the parent |
| `src/components/TodoList.tsx` | Rendering lists, why `key` exists, JSX elements as values |
| `src/components/TodoItem.tsx` | Props, event handlers, conditional styling |

Every place the long form differs from the idiomatic one, the short version is
written out in a comment block directly underneath, so you can see the two side
by side.

## The one rule worth carrying over

Never change state in place. Not `todos.push(...)`, not
`todo.completed = true`. Always build a new array or a new object and hand that
to the setter.

React decides whether to redraw by checking whether it was given a *different*
value than last time, not by inspecting what is inside. Edit the existing array
and React sees the same array it already had, concludes nothing changed, and
your screen goes stale even though the data is correct.

## Running it

```bash
pnpm install
pnpm dev
```

Other scripts: `pnpm lint`, `pnpm build`.

Note that this version saves under its own localStorage key
(`react-todo-long-version.todos`), so the two apps will not overwrite each
other's todos if you run both.
