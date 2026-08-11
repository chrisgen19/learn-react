import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

function TodoList({ todos, onDeleteTodo, onToggleTodo }: TodoListProps) {
  if (todos.length === 0) {
    return <p>Nothing to do yet. Add your first todo above.</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
