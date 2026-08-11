// ============================================================================
// ARRAY DRILLS
//
// Run me:   node drills.js
//
// Fill in each drill below. Run the file after every single one so you see
// the result immediately. Getting it wrong and fixing it is the whole point.
//
// Do NOT open solutions.js until you have attempted all eight.
// ============================================================================

const products = [
  { id: 1, name: "Shirt", price: 500, inStock: true },
  { id: 2, name: "Mug", price: 250, inStock: false },
  { id: 3, name: "Cap", price: 350, inStock: true },
  { id: 4, name: "Bag", price: 900, inStock: true },
  { id: 5, name: "Socks", price: 150, inStock: false },
];

// ----------------------------------------------------------------------------
// 1. Just the names.
//    Expected: [ 'Shirt', 'Mug', 'Cap', 'Bag', 'Socks' ]
//    Hint: .map() builds a NEW array by transforming each item.
// ----------------------------------------------------------------------------

//const names = null; // <- replace null with your answer

const names = products.map((product) => product.name);

console.log("1. names:", names);

// ----------------------------------------------------------------------------
// 2. Only the in-stock products (whole objects, not just names).
//    Expected: 3 items - Shirt, Cap, Bag
//    Hint: .filter() keeps items where your function returns true.
// ----------------------------------------------------------------------------

// const available = products.filter((product) => {
//   return product.inStock == true ? product.name : "";
// });

const available = products.filter((product) => product.inStock);

console.log("2. available:", available);

// ----------------------------------------------------------------------------
// 3. Total price of everything.
//    Expected: 2150
//    Hint: .reduce() carries a running total. It takes TWO arguments:
//          a function, and the starting value.
//          arr.reduce((runningTotal, item) => ..., 0)
// ----------------------------------------------------------------------------

const totalPrice = products.reduce((runningTotal, product) => {
  return runningTotal + product.price;
}, 0);

console.log("3. totalPrice:", totalPrice);

// ----------------------------------------------------------------------------
// 4. Total price of in-stock items only.
//    Expected: 1750
//    Hint: you already solved both halves. Chain them: .filter().reduce()
// ----------------------------------------------------------------------------

const availableTotal = null;

console.log("4. availableTotal:", availableTotal);

// ----------------------------------------------------------------------------
// 5. The same list, but every price raised by 10%.
//    Expected: Shirt 550, Mug 275, Cap 385, Bag 990, Socks 165
//
//    IMPORTANT: `products` must be UNCHANGED afterwards. The last line of this
//    drill checks that. Build new objects, do not edit the existing ones.
//    Hint: { ...product, price: ... } copies everything, then overrides price.
//
//    Do not panic if Cap comes out as 385.00000000000006. You did it right.
//    Computers store decimals in binary and 0.1 has no exact binary form, so
//    tiny errors creep in. Every language does this, not just JavaScript.
//    The usual fix for money is to work in whole centavos and only divide
//    when displaying. Ignore it for now.
// ----------------------------------------------------------------------------

const priceIncreased = null;

console.log("5. priceIncreased:", priceIncreased);
console.log("   original Shirt price still 500?", products[0].price === 500);

// ----------------------------------------------------------------------------
// 6. Find the product with id 2.
//    Expected: the Mug object
//    Hint: .find() returns the FIRST match, or undefined. Not an array.
// ----------------------------------------------------------------------------

const mug = null;

console.log("6. mug:", mug);

// ----------------------------------------------------------------------------
// 7. Is anything out of stock? Answer must be true or false, not a list.
//    Expected: true
//    Hint: .some() returns true if AT LEAST ONE item passes.
//          (.every() is its sibling: true only if ALL pass.)
// ----------------------------------------------------------------------------

const hasOutOfStock = null;

console.log("7. hasOutOfStock:", hasOutOfStock);

// ----------------------------------------------------------------------------
// 8. Sorted cheapest first, WITHOUT changing the original array.
//    Expected order: Socks, Mug, Cap, Shirt, Bag
//
//    This one is a trap. .sort() sorts IN PLACE and changes the array you
//    call it on. Copy first, then sort the copy.
//    Hint: [...products] makes the copy. sort((a, b) => a.price - b.price)
// ----------------------------------------------------------------------------

const cheapestFirst = null;

console.log("8. cheapestFirst:", cheapestFirst);
console.log("   original order intact?", products[0].name === "Shirt");

// ============================================================================
// Why drill 5 and drill 8 matter most:
//
// Both are about NOT changing the original. That is the exact same rule that
// makes React redraw the screen. Mutate in place and React sees the same
// array it already had, decides nothing changed, and your screen goes stale.
//
// Get these two into your fingers and setTodos([...todos, newTodo]) will
// stop looking like line noise.
// ============================================================================
