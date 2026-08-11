import { useState } from "react";
import type { SubmitEvent } from "react";

// This describes what this component expects to be handed from outside.
// It expects one thing: a function called onAddTodo that takes a string
// and returns nothing (that is what `void` means).
type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

// `props` is a plain object holding everything the parent passed in.
// Here it holds exactly one property: props.onAddTodo
function TodoForm(props: TodoFormProps) {
  // This state belongs to the form alone. The parent does not need to know
  // what is half-typed in the input box, so it lives down here.
  const [title, setTitle] = useState("");

  /**
   * Runs every time the user types a character in the input.
   */
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    // event.target is the <input> element itself.
    // event.target.value is whatever is currently typed in it.
    const typedText = event.target.value;

    setTitle(typedText);
  }

  /**
   * Runs when the user submits the form, by clicking Add or pressing Enter.
   */
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    // By default, submitting a form makes the browser reload the whole page.
    // That would wipe out our React app. This line stops that default.
    event.preventDefault();

    // .trim() removes spaces from the start and end, so "  " becomes "".
    const cleanedTitle = title.trim();

    // Ignore empty submissions. An empty string is "falsy", so !cleanedTitle
    // is true when the string is empty.
    if (!cleanedTitle) {
      return;
    }

    // Call the function the parent handed us. This is how a child component
    // talks back UP to its parent.
    props.onAddTodo(cleanedTitle);

    // Empty the input so the user can type the next one.
    setTitle("");
  }

  return (
    // onSubmit fires for both the Add button and the Enter key, which is why
    // we listen here on the form rather than onClick on the button.
    <form onSubmit={handleSubmit}>
      {/*
        This is a "controlled input". Its value comes from our state, and
        every keystroke goes through handleChange to update that state.
        React is the single source of truth for what is in the box.
      */}
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={handleChange}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
