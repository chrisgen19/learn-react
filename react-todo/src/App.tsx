import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { useEffect, useState } from "react";
import type { Todo } from "./types/todo";

const STORAGE_KEY = "react-todo.todos";

/**
 * Reads saved todos from localStorage. Returns an empty list if nothing is
 * stored, or if the stored value is corrupt or was written by an older shape.
 */
function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return [];
    }

    const parsed: unknown = JSON.parse(stored);

    return Array.isArray(parsed) ? (parsed as Todo[]) : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(title: string) {
    // create todo here

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  function deleteTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id),
    );
  }

  function toggleTodo(id: string) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  return (
    <main>
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onDeleteTodo={deleteTodo}
        onToggleTodo={toggleTodo}
      />
      <p>{todos.length} todos</p>
    </main>
  );
}

export default App;
