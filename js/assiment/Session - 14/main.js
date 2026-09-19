import { formatPrice, getDiscountedPrice } from "./utils.js";

import { formatSongTitle, getSongDurationInMinutes } from "./spotifyUtils.js";

console.log("Task 3");

const price = 999;
const discount = 10;

console.log("Original Price:", formatPrice(price));

console.log(
  "Discounted Price:",
  formatPrice(getDiscountedPrice(price, discount)),
);

console.log("Task 4 & 5");

const songTitle = "blinding lights";
const songDuration = 203;

console.log("Song:", formatSongTitle(songTitle));

console.log("Duration:", getSongDurationInMinutes(songDuration));

console.log("Task 6");

const products = [
  {
    name: "Shoes",
    price: 2000,
    discount: 10,
  },
  {
    name: "Shirt",
    price: 1500,
    discount: 20,
  },
  {
    name: "Watch",
    price: 5000,
    discount: 15,
  },
];

products.forEach(function (product) {
  const discountedPrice = getDiscountedPrice(product.price, product.discount);

  console.log("Product:", product.name);
  console.log("Original Price:", formatPrice(product.price));

  console.log("Discounted Price:", formatPrice(discountedPrice));
});

console.log("Task 9");

const sampleProduct = {
  name: "Headphones",
  price: 2500,
  discount: 20,
};

console.log("Product:", sampleProduct.name);

console.log("Price:", formatPrice(sampleProduct.price));

console.log(
  "Discounted Price:",
  formatPrice(getDiscountedPrice(sampleProduct.price, sampleProduct.discount)),
);

console.log("Task 10 & 11");

import { addToCart, removeFromCart, calculateTotal } from "./cartUtils.js";

let cart = [];

cart = addToCart(cart, {
  id: 1,
  name: "Shoes",
  price: 2000,
});

cart = addToCart(cart, {
  id: 2,
  name: "Shirt",
  price: 1500,
});

cart = addToCart(cart, {
  id: 3,
  name: "Watch",
  price: 3000,
});

console.log("Cart:", cart);

console.log("Cart Total:", formatPrice(calculateTotal(cart)));

cart = removeFromCart(cart, 2);

console.log("Updated Cart:", cart);

console.log("Updated Total:", formatPrice(calculateTotal(cart)));
