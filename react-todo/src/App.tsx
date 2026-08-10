import TodoForm from "./components/TodoForm";
import { useState } from "react";
import type { Todo } from "./types/todo";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo(title: string) {
    // create todo here

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  return (
    <main>
      <h1>My Todo App</h1>
      <TodoForm onAddTodo={addTodo} />
      <p>{todos.length} todos</p>
    </main>
  );
}

export default App;
