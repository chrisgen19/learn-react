// ============================================================================
// NESTED SOLUTIONS - only open after attempting all eight nested drills.
//
// Run me:   node nested-solutions.js
//
// If your answer differs but leaves the original untouched and changes the
// right value, yours is fine. There is rarely one correct way.
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

// 1. The bug. A shallow spread copies the outer object only. `profile` is a
//    reference, so both objects end up pointing at the same inner object.
const demoUser = { name: "Temp", profile: { city: "Cebu" } };
const copy = { ...demoUser };
copy.profile.city = "Baguio";

console.log("1. copy.profile.city:     ", copy.profile.city);
console.log("   demoUser.profile.city: ", demoUser.profile.city, "<- damaged, as expected");

// 2. One fresh object per level you are changing. The outer spread copies
//    id, name and tags; then `profile:` overrides the shared reference with a
//    brand new object built from the old one.
const moved = {
  ...users[0],
  profile: { ...users[0].profile, city: "Baguio" },
};

console.log("2. moved city:   ", moved.profile.city);
console.log("   original city:", users[0].profile.city, "| intact?", users[0].profile.city === "Cebu");

// 3. Three levels touched, three spreads. Read it outside in:
//    copy the user, but with a new profile, which is the old profile but with
//    new prefs, which are the old prefs but with a different fontSize.
const bigger = {
  ...users[1],
  profile: {
    ...users[1].profile,
    prefs: { ...users[1].profile.prefs, fontSize: 20 },
  },
};

console.log("3. bigger fontSize:  ", bigger.profile.prefs.fontSize);
console.log("   original fontSize:", users[1].profile.prefs.fontSize, "| intact?", users[1].profile.prefs.fontSize === 16);

// 4. Arrays spread the same way. [...old, newItem] to append,
//    [newItem, ...old] to prepend.
const tagged = { ...users[2], tags: [...users[2].tags, "vip"] };

console.log("4. tagged tags:  ", tagged.tags);
console.log("   original tags:", users[2].tags, "| intact?", users[2].tags.length === 2);

// 5. filter builds a new array by definition, so no spread is needed here.
//    The mutating versions to avoid: push, pop, shift, unshift, splice,
//    sort, reverse. The safe ones: map, filter, slice, concat, and the
//    newer toSorted, toReversed, toSpliced, with.
const untagged = { ...users[2], tags: users[2].tags.filter((tag) => tag !== "beta") };

console.log("5. untagged tags:", untagged.tags);
console.log("   original tags:", users[2].tags, "| intact?", users[2].tags.length === 2);

// 6. The shape you will write constantly in React. map over the list, rebuild
//    only the matching item, hand every other item straight back.
const relit = users.map((user) =>
  user.id === 2
    ? {
        ...user,
        profile: {
          ...user.profile,
          prefs: { ...user.profile.prefs, theme: "light" },
        },
      }
    : user
);

console.log("6. Ben theme:  ", relit[1].profile.prefs.theme);
console.log("   original:   ", users[1].profile.prefs.theme, "| intact?", users[1].profile.prefs.theme === "dark");

// 7. structuredClone copies all the way down, so plain assignment is safe.
const deep = structuredClone(users[0]);
deep.profile.city = "Iloilo";

console.log("7. deep city:    ", deep.profile.city);
console.log("   original city:", users[0].profile.city, "| intact?", users[0].profile.city === "Cebu");

// The old trick for this was JSON.parse(JSON.stringify(obj)). It mostly works
// but silently destroys Dates, Maps, Sets, undefined and NaN. structuredClone
// handles those and is built into Node 17+ and every current browser. Use it
// instead. Neither handles functions.

// 8. Ana: never touched, so map returned the identical object. Same reference.
//    Ben: rebuilt, so new reference at every level along the path.
//    Ben's tags: never touched, so the new Ben object still points at the
//    original tags array. That sharing is correct and deliberate. The array is
//    never mutated by anyone, so there is no reason to duplicate it, and
//    keeping it lets React skip re-rendering anything that only reads tags.
console.log("8. Ana same object?      ", relit[0] === users[0], "  <- true, untouched");
console.log("   Ben same object?      ", relit[1] === users[1], " <- false, rebuilt");
console.log("   Ben's tags same array?", relit[1].tags === users[1].tags, "  <- true, off the path");

// Compare with the structuredClone version:
const relitDeep = users.map((user) =>
  user.id === 2
    ? (() => {
        const clone = structuredClone(user);
        clone.profile.prefs.theme = "light";
        return clone;
      })()
    : user
);

console.log("   with structuredClone, Ben's tags same array?", relitDeep[1].tags === users[1].tags, "<- false");

// Same visible result, but the tags array got needlessly duplicated. In a real
// component tree that is the difference between one child re-rendering and
// twenty. Correct output, wasted work, and nothing warns you.
