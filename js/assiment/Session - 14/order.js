export function generateOrderId() {
  return Math.random()
    .toString(36)
    .substring(2, 10)
    .padEnd(8, "0")
    .toUpperCase();
}

const orderId = generateOrderId();

console.log("Task 1 & 2");
console.log("New Order ID:", orderId);
