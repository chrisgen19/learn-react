import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
};

function TodoItem(props: TodoItemProps) {
  return <li>{props.todo.title}</li>;
}

export default TodoItem;
