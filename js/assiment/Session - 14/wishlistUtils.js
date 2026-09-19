export function addToWishlist(wishlist, product) {
  wishlist.push(product);
  return wishlist;
}

export function removeFromWishlist(wishlist, productId) {
  return wishlist.filter(function (product) {
    return product.id !== productId;
  });
}

export function listWishlist(wishlist) {
  return wishlist.map(function (product) {
    return product.name;
  });
}
