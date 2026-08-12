// ============================================================================
// NESTED DRILLS - the shallow copy trap
//
// Run me:   node nested-drills.js
//
// The eight array drills used flat objects, where { ...product } was enough.
// Real data is not flat. The moment an object contains another object or an
// array, spread stops protecting you and starts lying to you quietly.
//
// Drill 1 shows you the lie. The rest teach you to work around it.
//
// Do NOT open nested-solutions.js until you have attempted all eight.
// ============================================================================

const users = [
  {
    id: 1,
    name: "Ana",
    tags: ["admin", "beta"],
    profile: { city: "Cebu", prefs: { theme: "light", fontSize: 14 } },
  },
  {
    id: 2,
    name: "Ben",
    tags: ["viewer"],
    profile: { city: "Davao", prefs: { theme: "dark", fontSize: 16 } },
  },
  {
    id: 3,
    name: "Carla",
    tags: ["editor", "beta"],
    profile: { city: "Manila", prefs: { theme: "light", fontSize: 12 } },
  },
];

// ----------------------------------------------------------------------------
// 1. See the bug with your own eyes. This one is not a puzzle, it is a demo.
//
//    Fill in `copy` with a plain shallow spread of `demoUser`, then run.
//    Before you run it, guess what the two logs will say.
//
//    Hint: const copy = { ...demoUser };
// ----------------------------------------------------------------------------

const demoUser = { name: "Temp", profile: { city: "Cebu" } };

const copy = null; // <- replace null with a shallow spread of demoUser

// Leave this line alone. It edits the COPY, not the original.
if (copy) copy.profile.city = "Baguio";

console.log("1. copy.profile.city:     ", copy && copy.profile.city);
console.log("   demoUser.profile.city: ", demoUser.profile.city, "<- watch this one");

// Both say Baguio. You edited the copy and the original changed anyway.
//
// Why: { ...demoUser } copied the VALUE of every key. For `name` the value is
// the string "Temp", so you got your own string. For `profile` the value is
// not the object, it is a reference, an arrow pointing at one object sitting
// in memory. Copying an arrow gives you a second arrow to the same object.
//
//   demoUser ──┐
//              ├──► { city: "Cebu" }     one object, two arrows
//   copy ──────┘
//
// The outer object is genuinely new. Everything one level down is shared.

// ----------------------------------------------------------------------------
// 2. Now do it properly. Copy `users[0]` and set the city to "Baguio",
//    leaving the original completely untouched.
//    Expected: moved.profile.city is Baguio, users[0].profile.city is Cebu
//
//    Hint: you need a fresh object at EVERY level you are changing.
//          { ...user, profile: { ...user.profile, city: "Baguio" } }
// ----------------------------------------------------------------------------

const moved = null; // <- your answer

console.log("2. moved city:   ", moved && moved.profile.city);
console.log("   original city:", users[0].profile.city, "| intact?", users[0].profile.city === "Cebu");

// ----------------------------------------------------------------------------
// 3. Same idea, one level deeper. Copy `users[1]` and set the font size to 20.
//    The value lives at user.profile.prefs.fontSize.
//    Expected: bigger font size 20, original still 16
//
//    Hint: three levels changed means three spreads, nested inside each other.
//          Write it on multiple lines or it becomes unreadable.
// ----------------------------------------------------------------------------

const bigger = null; // <- your answer

console.log("3. bigger fontSize:  ", bigger && bigger.profile.prefs.fontSize);
console.log("   original fontSize:", users[1].profile.prefs.fontSize, "| intact?", users[1].profile.prefs.fontSize === 16);

// ----------------------------------------------------------------------------
// 4. Arrays are objects too, so they have the same problem.
//    Copy `users[2]` and add the tag "vip" to the end of its tags.
//    Expected: [ 'editor', 'beta', 'vip' ], original still 2 tags
//
//    Hint: tags: [...user.tags, "vip"]
//          NOT tags.push(), which mutates the array you called it on.
// ----------------------------------------------------------------------------

const tagged = null; // <- your answer

console.log("4. tagged tags:  ", tagged && tagged.tags);
console.log("   original tags:", users[2].tags, "| intact?", users[2].tags.length === 2);

// ----------------------------------------------------------------------------
// 5. Same, but removing. Copy `users[2]` without the "beta" tag.
//    Expected: [ 'editor' ], original still has 2
//
//    Hint: filter already returns a new array, so you do not need to spread it.
// ----------------------------------------------------------------------------

const untagged = null; // <- your answer

console.log("5. untagged tags:", untagged && untagged.tags);
console.log("   original tags:", users[2].tags, "| intact?", users[2].tags.length === 2);

// ----------------------------------------------------------------------------
// 6. The real one. In the whole `users` LIST, change only Ben's theme to
//    "light". Everyone else passes through unchanged.
//    Expected: Ben's theme is light, Ana and Carla untouched
//
//    Hint: map over users, and for each one decide: is this the one?
//          user.id === 2 ? { ...deep copy with the change... } : user
//
//    Note the `: user` at the end. Items you are not changing should be
//    returned as-is, not copied. Drill 8 explains why that matters.
// ----------------------------------------------------------------------------

const relit = null; // <- your answer

console.log("6. Ben theme:  ", relit && relit[1].profile.prefs.theme);
console.log("   original:   ", users[1].profile.prefs.theme, "| intact?", users[1].profile.prefs.theme === "dark");

// ----------------------------------------------------------------------------
// 7. The escape hatch. structuredClone() copies every level for you, all the
//    way down. Clone `users[0]`, change the clone's city to "Iloilo" by plain
//    assignment, and confirm the original survived.
//    Expected: clone says Iloilo, original still Cebu
//
//    Hint: const deep = structuredClone(users[0]);
//          deep.profile.city = "Iloilo";
//
//    Why not always use this? It is slower, it copies things you did not
//    change, and it throws on functions, DOM nodes, and class instances.
//    For React state it also defeats the reference checks in drill 8: every
//    nested object comes back new, so every child component sees "changed"
//    and re-renders. Fine for a config blob, wrong as a default habit.
// ----------------------------------------------------------------------------

const deep = null; // <- your answer (clone it, then assign the new city)

console.log("7. deep city:    ", deep && deep.profile.city);
console.log("   original city:", users[0].profile.city, "| intact?", users[0].profile.city === "Cebu");

// ----------------------------------------------------------------------------
// 8. Reference equality, which is the whole reason any of this matters.
//    Using your answer from drill 6, fill in what you EXPECT each check to be,
//    then run and see if you were right.
//
//    The rule: copy only along the path you touched. Everything off that path
//    should still be the very same object.
//
//        users ─── Ana    (untouched, should stay the SAME object)
//              ├── Ben    (changed, must be NEW)
//              │    └── profile   (on the path, must be NEW)
//              │         └── prefs (on the path, must be NEW)
//              │         └── tags  (NOT on the path, should stay the SAME)
//              └── Carla  (untouched, should stay the SAME object)
//
//    Replace each null with true or false.
// ----------------------------------------------------------------------------

const guessAnaSame = null; // relit[0] === users[0] ?
const guessBenSame = null; // relit[1] === users[1] ?
const guessBenTagsSame = null; // relit[1].tags === users[1].tags ?

if (relit) {
  console.log("8. Ana same object?     ", relit[0] === users[0], "| you guessed", guessAnaSame);
  console.log("   Ben same object?     ", relit[1] === users[1], "| you guessed", guessBenSame);
  console.log("   Ben's tags same array?", relit[1].tags === users[1].tags, "| you guessed", guessBenTagsSame);
} else {
  console.log("8. finish drill 6 first");
}

// ============================================================================
// Why drill 8 is the point of the whole file:
//
// React decides whether to redraw a component by asking "is this prop a
// different object than last time?" It does not compare field by field.
//
// So the two failure modes are mirror images:
//
//   Copied too little  ->  you mutated something React already had.
//                          Data is right, screen is stale, no error.
//
//   Copied too much    ->  everything looks new, every child redraws,
//                          the app gets slow for no reason. Also no error.
//
// Neither one throws. That is why this is worth drilling rather than looking
// up when needed. Copy exactly the path you changed, and nothing else.
//
// One last note: if you find yourself writing four levels of nested spread,
// that is usually the data telling you it is shaped wrong. Flatter state is
// easier to update, which is why people reach for normalised shapes or a
// library like Immer. Learn the manual version first so you know what those
// are doing for you.
// ============================================================================
