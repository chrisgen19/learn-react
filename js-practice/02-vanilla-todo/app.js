// ============================================================================
// VANILLA TODO - your turn
//
// Open index.html in your browser. Keep DevTools console open (F12) so you
// see errors as they happen.
//
// Everything below marked TODO is yours to write. The scaffolding around it
// is done so you can focus on the logic, not on boilerplate.
//
// Rule for this exercise: use map / filter / find / spread. No for loops.
// You just drilled those. This is where you use them for real.
// ============================================================================

// --- The data ---------------------------------------------------------------
//
// One array. This is the ONLY source of truth about what exists.
// The screen is just a picture of this array, redrawn whenever it changes.

let todos = [];

// --- Finding the elements on the page ---------------------------------------
//
// These run once. document.querySelector finds an element by CSS selector.

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const countLabel = document.querySelector("#todo-count");

// --- Drawing -----------------------------------------------------------------

/**
 * Wipes the list and rebuilds it from the `todos` array.
 *
 * In React you never write this. useState triggers it for you. Here you must
 * call it yourself after EVERY change, or the screen will quietly disagree
 * with your data. That is the lesson of this whole exercise.
 */
function render() {
  // Start from a blank list every time. Simplest correct approach.
  list.innerHTML = "";

  // TODO 1: create one <li> per todo and put it in the list.
  //
  // For each todo you need to:
  //   - const li = document.createElement("li");
  //   - if the todo is completed, add the class: li.classList.add("completed")
  //   - build a checkbox:  document.createElement("input"), type "checkbox",
  //     and .checked set from the todo
  //   - build a <span> whose .textContent is the title
  //   - build a <button> whose .textContent is "Delete"
  //   - wire up the events (see TODO 2 and 3)
  //   - li.append(checkbox, span, button)
  //   - list.append(li)
  //
  // Start by just getting the title to show up. Ignore the checkbox and the
  // delete button until plain text renders. Small steps.

  // TODO 4: show the count in `countLabel`.
  //   Something like "2 of 5 remaining".
  //   Use .filter() to count the ones that are not completed.
  //   Set it with countLabel.textContent = ...
}

// --- Changing the data -------------------------------------------------------
//
// Notice that NONE of these functions touch the page. They only change the
// array, then call render(). Keeping "change the data" and "draw the data"
// separate is the single most useful habit here, and it is exactly how React
// is structured.

/**
 * Adds a todo with the given title.
 */
function addTodo(title) {
  // TODO 2: build the new todo object and put it in the array.
  //
  // Shape:  { id: crypto.randomUUID(), title: title, completed: false }
  //
  // Then:   todos = [...todos, newTodo];
  //
  // Note we REPLACE the array rather than push into it. You do not strictly
  // have to here (no React watching), but building the habit now means it is
  // automatic when you go back to React.
  //
  // Finally: render();
}

/**
 * Flips one todo between done and not-done.
 */
function toggleTodo(id) {
  // TODO 3a: replace `todos` with a new array where the matching todo has
  // completed flipped, and everything else is untouched.
  //
  // .map() with a conditional. If you get stuck, look at drill 5 in
  // ../01-array-drills/solutions.js - it is the same shape.
  //
  // Then: render();
}

/**
 * Removes one todo.
 */
function deleteTodo(id) {
  // TODO 3b: replace `todos` with a new array that has everything EXCEPT the
  // one with this id.
  //
  // .filter(). One line. Then render();
}

// --- Wiring up the form ------------------------------------------------------

form.addEventListener("submit", (event) => {
  // Without this the browser reloads the page on submit and wipes everything.
  event.preventDefault();

  const title = input.value.trim();

  // Ignore empty submissions.
  if (!title) {
    return;
  }

  addTodo(title);

  // Clear the box so the next one can be typed.
  input.value = "";
});

// --- Kick things off ---------------------------------------------------------
//
// Draw once at startup, so the empty state and count are correct before the
// user does anything.

render();

// ============================================================================
// STRETCH GOALS, once the basics work
//
// 1. Show a "Nothing to do yet" message when the list is empty.
//
// 2. Persist to localStorage so a refresh keeps the todos.
//      save:  localStorage.setItem("vanilla-todos", JSON.stringify(todos))
//      load:  JSON.parse(localStorage.getItem("vanilla-todos") ?? "[]")
//    Where does the save call go so you cannot forget it?
//
// 3. Add filter buttons: All / Active / Completed.
//    Hint: keep a separate `let currentFilter = "all"` and apply a .filter()
//    inside render(). Do NOT delete anything from `todos` itself.
//    This one teaches the difference between the data you HAVE and the data
//    you are SHOWING - a distinction that matters a lot in real apps.
//
// 4. Double-click a title to edit it in place.
//
// ============================================================================
// WHEN YOU ARE DONE
//
// Count how many times you had to call render(). That number is exactly how
// many chances you had to forget it and ship a bug where the data is right
// but the screen is wrong.
//
// That is the problem React exists to solve. Go back and read
// ../../react-todo/src/App.tsx afterwards - it should read very differently.
// ============================================================================
