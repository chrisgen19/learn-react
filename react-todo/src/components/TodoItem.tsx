import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

function TodoItem(props: TodoItemProps) {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }

  function handleToggle() {
    props.onToggleTodo(props.todo.id);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={handleToggle}
      />
      <span
        style={{
          textDecoration: props.todo.completed ? "line-through" : "none",
        }}
      >
        {props.todo.title}
      </span>
      <button
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
