import { useEffect, useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import type { Todo } from "./types/todo";

// The key we save under in the browser's localStorage. It is just a string.
// Naming it once as a constant means we cannot misspell it in one place and
// silently break saving or loading.
const STORAGE_KEY = "react-todo-long-version.todos";

/**
 * Reads the saved todo list back out of the browser's localStorage.
 *
 * localStorage can only store strings, never real objects or arrays. So when
 * we saved, we turned the array into a string. Now we have to turn that string
 * back into a real array. That is what JSON.parse does.
 */
function loadTodosFromStorage(): Todo[] {
  // A try/catch says: "attempt this; if it throws an error, do the catch block
  // instead of crashing the whole app."
  try {
    // Step 1: read the raw string. If we have never saved, this is null.
    const savedText = localStorage.getItem(STORAGE_KEY);

    // Step 2: nothing saved yet, so start with an empty list.
    if (savedText === null) {
      return [];
    }

    // Step 3: turn the string back into real JavaScript values.
    // We type it as "unknown" because we genuinely do not know what is in
    // localStorage. Someone could have edited it by hand.
    const parsedValue: unknown = JSON.parse(savedText);

    // Step 4: make sure it is actually an array before we hand it to React.
    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue as Todo[];
  } catch {
    // If JSON.parse choked on a malformed string, fall back to an empty list
    // rather than letting the error blank out the entire app.
    return [];
  }
}

function App() {
  // useState gives us back exactly two things, always in this order:
  //   1. the current value
  //   2. a function that lets us change that value
  //
  // The square brackets are "array destructuring": useState returns a
  // two-item array, and this pulls item 0 into `todos` and item 1 into
  // `setTodos`. The names are ours to choose.
  //
  // We pass `loadTodosFromStorage` WITHOUT parentheses on purpose. Passing the
  // function itself lets React call it only once, on the very first render.
  // If we wrote loadTodosFromStorage() with parentheses, it would read from
  // localStorage on every single render and throw the result away.
  const [todos, setTodos] = useState<Todo[]>(loadTodosFromStorage);

  // useEffect runs code AFTER React has finished drawing to the screen.
  // The array at the end, [todos], is the dependency list. It means:
  // "run this again whenever `todos` has changed."
  //
  // So every time the list changes for any reason (add, toggle, delete),
  // we save the new version. We do not have to remember to call save inside
  // each of the three functions below.
  useEffect(() => {
    // localStorage only stores strings, so turn the array into a string first.
    const textToSave = JSON.stringify(todos);

    localStorage.setItem(STORAGE_KEY, textToSave);
  }, [todos]);

  /**
   * Adds one new todo to the end of the list.
   */
  function addTodo(title: string) {
    // Step 1: build the new todo object.
    // crypto.randomUUID() is a built-in browser function that returns a random
    // unique string, so every todo gets its own id.
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title,
      completed: false,
    };

    // Step 2: build a BRAND NEW array that has everything the old one had,
    // plus the new todo on the end.
    //
    // This is the important part. We must not do todos.push(newTodo). That
    // would change the existing array in place, and React would see the same
    // array it already had and conclude nothing changed, so the screen would
    // not update. React only re-draws when it gets a NEW array.
    const updatedTodos: Todo[] = [];

    // Copy every existing todo into the new array, one at a time.
    for (const existingTodo of todos) {
      updatedTodos.push(existingTodo);
    }

    // Now add the new one at the end.
    updatedTodos.push(newTodo);

    // Step 3: hand the new array to React. This is what triggers a re-draw.
    setTodos(updatedTodos);

    // ---------------------------------------------------------------------
    // The short version of steps 2 and 3, which you will see everywhere:
    //
    //   setTodos([...todos, newTodo]);
    //
    // The three dots are the "spread operator". [...todos] means "make a new
    // array and unpack every item of `todos` into it". Then newTodo goes on
    // the end. It is the exact same work as the for loop above, written on
    // one line.
    // ---------------------------------------------------------------------
  }

  /**
   * Removes the todo with the given id from the list.
   */
  function deleteTodo(id: string) {
    // Again we build a new array rather than changing the old one.
    // This time we simply skip the one we want gone.
    const remainingTodos: Todo[] = [];

    for (const existingTodo of todos) {
      // Keep every todo whose id does NOT match the one we are deleting.
      if (existingTodo.id !== id) {
        remainingTodos.push(existingTodo);
      }
    }

    setTodos(remainingTodos);

    // ---------------------------------------------------------------------
    // The short version:
    //
    //   setTodos(todos.filter((todo) => todo.id !== id));
    //
    // .filter() walks the array and keeps only the items where the function
    // you gave it returns true. Same loop, one line.
    // ---------------------------------------------------------------------
  }

  /**
   * Flips one todo between done and not-done.
   */
  function toggleTodo(id: string) {
    const updatedTodos: Todo[] = [];

    for (const existingTodo of todos) {
      if (existingTodo.id === id) {
        // This is the one the user clicked.
        //
        // We do NOT write existingTodo.completed = !existingTodo.completed.
        // That would edit the object React is already holding, and React would
        // not notice the change. Instead we build a replacement object.
        const updatedTodo: Todo = {
          id: existingTodo.id,
          title: existingTodo.title,
          // The ! means "not". If it was false this becomes true, and the
          // other way around.
          completed: !existingTodo.completed,
        };

        updatedTodos.push(updatedTodo);
      } else {
        // Not the one we care about, so keep it exactly as it was.
        updatedTodos.push(existingTodo);
      }
    }

    setTodos(updatedTodos);

    // ---------------------------------------------------------------------
    // The short version:
    //
    //   setTodos(
    //     todos.map((todo) =>
    //       todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    //     ),
    //   );
    //
    // .map() builds a new array by running your function on each item.
    // { ...todo, completed: ... } means "copy every property of todo, then
    // override completed". The ? : is a compact if/else.
    // ---------------------------------------------------------------------
  }

  // Count how many are still not done, using a plain loop.
  let remainingCount = 0;

  for (const todo of todos) {
    if (!todo.completed) {
      remainingCount = remainingCount + 1;
    }
  }

  return (
    <main>
      <h1>My Todo App (long version)</h1>

      {/*
        We pass our functions DOWN to the child components as props.
        The child does not know what addTodo does. It only knows it was handed
        a function, and it calls that function when the user submits.
      */}
      <TodoForm onAddTodo={addTodo} />

      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />

      <p>
        {remainingCount} of {todos.length} remaining
      </p>
    </main>
  );
}

export default App;
