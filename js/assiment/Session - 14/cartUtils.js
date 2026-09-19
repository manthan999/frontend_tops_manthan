export function addToCart(cart, product) {
  cart.push(product);
  return cart;
}

export function removeFromCart(cart, productId) {
  return cart.filter(function (product) {
    return product.id !== productId;
  });
}

export function calculateTotal(cart) {
  return cart.reduce(function (total, product) {
    return total + product.price;
  }, 0);
}
