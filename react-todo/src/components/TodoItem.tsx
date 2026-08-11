import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
};

function TodoItem(props: TodoItemProps) {
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }

  return (
    <li>
      <span>{props.todo.title}</span>
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
