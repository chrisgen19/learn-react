// ============================================================================
// SOLUTIONS - only open after attempting all eight drills.
//
// Run me:   node solutions.js
//
// If your answer differs from these but produces the right result, yours is
// probably fine. There is rarely one correct way.
// ============================================================================

const products = [
  { id: 1, name: "Shirt", price: 500, inStock: true },
  { id: 2, name: "Mug", price: 250, inStock: false },
  { id: 3, name: "Cap", price: 350, inStock: true },
  { id: 4, name: "Bag", price: 900, inStock: true },
  { id: 5, name: "Socks", price: 150, inStock: false },
];

// 1. map: transform every item into something else.
const names = products.map((product) => product.name);

console.log("1. names:", names);

// 2. filter: keep the items where the function returns true.
const available = products.filter((product) => product.inStock);

console.log("2. available:", available);

// 3. reduce: carry a running value across the whole array.
//    `total` starts at 0 (the second argument) and becomes whatever you
//    return, ready for the next item.
const totalPrice = products.reduce((total, product) => total + product.price, 0);

console.log("3. totalPrice:", totalPrice);

// 4. Chaining. filter() hands its new array straight to reduce().
//    Read left to right: take products, keep in-stock, add up the prices.
const availableTotal = products
  .filter((product) => product.inStock)
  .reduce((total, product) => total + product.price, 0);

console.log("4. availableTotal:", availableTotal);

// 5. Object spread. { ...product } copies every property into a fresh object.
//    Listing `price` afterwards overrides just that one.
//    The original objects are never touched.
const priceIncreased = products.map((product) => ({
  ...product,
  price: product.price * 1.1,
}));

console.log("5. priceIncreased:", priceIncreased);
console.log("   original Shirt price still 500?", products[0].price === 500);

// Note the parentheses in `(product) => ({ ... })`.
// Without them JavaScript reads the { as the start of a function body, not an
// object. Wrapping in ( ) says "this is a value I am returning". Common trap.

// 6. find: first match, or undefined. Returns the item itself, not an array.
const mug = products.find((product) => product.id === 2);

console.log("6. mug:", mug);

// 7. some: true if at least one passes. every: true only if all pass.
const hasOutOfStock = products.some((product) => !product.inStock);

console.log("7. hasOutOfStock:", hasOutOfStock);

// 8. Copy first, THEN sort. [...products] is the copy.
//    The comparison returns a negative number, zero, or a positive number,
//    which is how sort decides the order. a.price - b.price gives ascending.
const cheapestFirst = [...products].sort((a, b) => a.price - b.price);

console.log("8. cheapestFirst:", cheapestFirst);
console.log("   original order intact?", products[0].name === "Shirt");

// Without the copy:
//
//   const wrong = products.sort((a, b) => a.price - b.price);
//
// `wrong` and `products` would be THE SAME ARRAY. sort() rearranges in place
// and hands you back the very thing you passed in. In React that is the bug
// where your data is right but the screen never updates.
