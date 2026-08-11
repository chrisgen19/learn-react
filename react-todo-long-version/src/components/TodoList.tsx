import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

type TodoListProps = {
  todos: Todo[];
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
};

function TodoList(props: TodoListProps) {
  // Handle the empty case first and return early. Everything below this point
  // can then safely assume there is at least one todo.
  if (props.todos.length === 0) {
    return <p>Nothing to do yet. Add your first todo above.</p>;
  }

  // Build up the list items one at a time into a normal array.
  //
  // This is worth seeing spelled out: JSX elements are just VALUES. You can
  // put them in an array, pass them around, and hand the array to React at
  // the end. There is nothing magical about them.
  const todoItems = [];

  for (const todo of props.todos) {
    const item = (
      // `key` is required whenever you render a list. React uses it to tell
      // the items apart between re-draws, so it can update just the one that
      // changed instead of rebuilding all of them. It must be unique and
      // stable, which is exactly what our todo.id is.
      <TodoItem
        key={todo.id}
        todo={todo}
        onDeleteTodo={props.onDeleteTodo}
        onToggleTodo={props.onToggleTodo}
      />
    );

    todoItems.push(item);
  }

  // Putting an array inside JSX renders every element in it, in order.
  return <ul>{todoItems}</ul>;

  // -------------------------------------------------------------------------
  // The short version of the whole loop above:
  //
  //   <ul>
  //     {props.todos.map((todo) => (
  //       <TodoItem
  //         key={todo.id}
  //         todo={todo}
  //         onDeleteTodo={props.onDeleteTodo}
  //         onToggleTodo={props.onToggleTodo}
  //       />
  //     ))}
  //   </ul>
  //
  // .map() builds the array for you instead of you pushing into it by hand.
  // -------------------------------------------------------------------------
}

export default TodoList;
