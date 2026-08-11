// A "type" describes the shape of an object. It is a TypeScript-only thing:
// it disappears completely when the code runs in the browser. Its whole job is
// to let the editor tell you when you spell a property wrong or forget one.
//
// This says: a Todo is an object with exactly these three properties.
export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};
