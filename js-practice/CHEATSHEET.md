# Array shapes cheat sheet

Look things up here by **what you are trying to do**, never by method name.
You are not meant to memorise this. You are meant to reread it until the
names start feeling familiar, which takes months of use, not an evening.

---

## 1. Start with the shape

Ask one question: **what comes out the other end?**

| I have | I want | Method |
| --- | --- | --- |
| 5 items | 5 items, each changed | `map` |
| 5 items | fewer items, unchanged | `filter` |
| 5 items | **one** item | `find` |
| 5 items | **one** value (number, string, object) | `reduce` |
| 5 items | `true` / `false` | `some`, `every`, `includes` |
| 5 items | a position number | `indexOf`, `findIndex` |
| 5 items | one string | `join` |
| 5 items | nothing (just doing something) | `forEach`, or a plain `for` loop |

If you know the shape, you have already done the hard part. The name is
trivia, and trivia is lookupable.

---

## 2. The plain-English index

Scan the left column for words you would actually say out loud.

| What you would say | Method |
| --- | --- |
| "just the names" / "all the prices" | `map` |
| "only the ones that..." / "everything except..." | `filter` |
| "the one with id 3" / "the first one that..." | `find` |
| "the total" / "the count of" / "combine into one" | `reduce` |
| "is there any...?" | `some` |
| "are they all...?" | `every` |
| "is this value in the list?" | `includes` |
| "where is it?" / "what position?" | `findIndex` |
| "the first 3" / "items 2 to 5" | `slice` |
| "sorted by price" | `[...arr].sort()` |
| "backwards" | `[...arr].reverse()` |
| "as a comma separated string" | `join` |
| "flatten nested arrays" | `flat` |
| "do something with each one" | `for...of` |

---

## 3. The three React state recipes

These three cover almost everything you will do to a list in `useState`.
Worth knowing cold, because they come up constantly.

```js
// ADD one to the end
setTodos([...todos, newTodo]);

// REMOVE the one with this id
setTodos(todos.filter((todo) => todo.id !== id));

// UPDATE just the one with this id, leave the rest alone
setTodos(
  todos.map((todo) =>
    todo.id === id ? { ...todo, completed: true } : todo
  )
);
```

Read the third one as: "go through every todo; if it is the one I mean,
hand back a copy with `completed` changed; otherwise hand back the original
untouched."

---

## 4. Mutating vs safe

This is the table that actually matters in React. Left column changes the
original array in place, which is the bug where your data is right but the
screen never updates.

| Mutates (careful) | Safe (returns new) |
| --- | --- |
| `push`, `pop` | `[...arr, item]` |
| `shift`, `unshift` | `[item, ...arr]` |
| `splice` | `slice` |
| `sort` | `[...arr].sort()` |
| `reverse` | `[...arr].reverse()` |

`map`, `filter`, `reduce`, `find`, `slice`, `concat`, and `join` never mutate.
That is a large part of why React code leans on them so heavily.

The fix for anything in the left column is always the same: copy first with
`[...arr]`, then do the mutating thing to the copy.

> Newer browsers also have `toSorted()` and `toReversed()`, which are the
> non-mutating versions built in. Handy, but `[...arr].sort()` works
> everywhere and is still what you will see in most code.

---

## 5. The callback confusion

Every method here takes a function. What differs is **what the method does
with your return value.**

| Method | Your return value is used as |
| --- | --- |
| `map` | the new item |
| `filter` | yes/no - keep the **original** item? |
| `find` | yes/no - is this the one? |
| `some` / `every` | yes/no |
| `reduce` | the value carried to the next item |
| `forEach` | ignored entirely |

The `filter` row is the one that trips people up. It ignores *what* you
return and only checks truthy or falsy, then hands back the original item.

---

## 6. reduce, if you must

Read it as **fold**. That is what other languages call it and it is the
better name.

```js
arr.reduce((carried, item) => newCarriedValue, startingValue)
```

- `startingValue` is just `let carried = startingValue` before a loop
- whatever you `return` becomes `carried` next time round
- the last return is your answer

```js
// sum                      start with 0
prices.reduce((total, p) => total + p, 0)

// longest name             start with ""
names.reduce((longest, n) => (n.length > longest.length ? n : longest), "")
```

And genuinely: if a `for` loop is clearer to you for a given job, write the
`for` loop. `map` and `filter` are shorter *and* clearer than loops, so they
earn their keep. `reduce` often is not, and plenty of experienced developers
avoid it for exactly that reason.

---

## 7. Chaining

Each method hands its result to the next, so read left to right as a sentence.

```js
products
  .filter((p) => p.inStock)                  // 5 items -> 3 items
  .map((p) => p.name)                        // 3 items -> 3 names
  .join(", ");                               // 3 names -> one string
```

"Take products, keep the in-stock ones, get their names, join with commas."

Only chain where the shapes line up. `find` returns one item, not an array,
so nothing array-ish can follow it.

---

## When to stop using this file

When you stop opening it. That will happen on its own, through use, and it
takes longer than you expect. That is normal and is not a sign you are
learning too slowly.
