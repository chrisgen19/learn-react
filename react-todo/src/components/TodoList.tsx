import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
};

function TodoList({ todos, onDeleteTodo }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
