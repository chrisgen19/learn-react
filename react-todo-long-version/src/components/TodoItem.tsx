import type { Todo } from "../types/todo";

type TodoItemProps = {
  todo: Todo;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

function TodoItem(props: TodoItemProps) {
  /**
   * Runs when the user ticks or unticks the checkbox.
   */
  function handleToggle() {
    // This component does not know HOW to toggle a todo. It does not touch
    // the list at all. It just reports "this id was clicked" upward, and lets
    // App decide what that means.
    props.onToggleTodo(props.todo.id);
  }

  /**
   * Runs when the user clicks the Delete button.
   */
  function handleDelete() {
    props.onDeleteTodo(props.todo.id);
  }

  // Work out the styling in a plain variable first, so the JSX below stays
  // easy to read.
  let titleStyle: React.CSSProperties;

  if (props.todo.completed) {
    titleStyle = { textDecoration: "line-through" };
  } else {
    titleStyle = { textDecoration: "none" };
  }

  return (
    <li>
      {/*
        Another controlled input, same idea as the text box in TodoForm.
        `checked` is driven by our data, and onChange reports the click back
        up. The checkbox cannot tick itself; only a change to todo.completed
        can make it appear ticked.
      */}
      <input
        type="checkbox"
        checked={props.todo.completed}
        onChange={handleToggle}
      />

      <span style={titleStyle}>{props.todo.title}</span>

      {/*
        type="button" matters here. Inside a <form>, a button with no type
        defaults to type="submit". This one is not in a form, but being
        explicit avoids that trap later.
      */}
      <button type="button" onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
}

export default TodoItem;
