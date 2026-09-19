import {
  addToWishlist,
  removeFromWishlist,
  listWishlist,
} from "./wishlistUtils.js";

console.log("Task 12");

let wishlist = [];

wishlist = addToWishlist(wishlist, {
  id: 1,
  name: "Shoes",
});

wishlist = addToWishlist(wishlist, {
  id: 2,
  name: "Watch",
});

wishlist = addToWishlist(wishlist, {
  id: 3,
  name: "Headphones",
});

console.log("Wishlist:", listWishlist(wishlist));

wishlist = removeFromWishlist(wishlist, 2);

console.log("Updated Wishlist:", listWishlist(wishlist));
