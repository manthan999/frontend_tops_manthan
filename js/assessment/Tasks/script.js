"use strict";

const restaurantName = "Spice Garden";
const cuisineType = "Indian";
const averageRating = 4.5;
const isRestaurantOpen = true;

const openStatus = isRestaurantOpen ? "Open Now" : "Closed";

const restaurantProfile = `${restaurantName} | ${cuisineType} | Rating: ${averageRating} | ${openStatus}`;

console.log("TASK 1 — RESTAURANT PROFILE");
console.log(restaurantProfile);

const restaurantDetails = {
  name: restaurantName,
  cuisine: cuisineType,
  averageRating,
  isOpen: isRestaurantOpen,
};

const restaurantJson = JSON.stringify(restaurantDetails);

console.log("TASK 1 — JSON STRING");
console.log(restaurantJson);

document.querySelector("#profilePreview").textContent = restaurantProfile;
document.querySelector("#profileJson").textContent = restaurantJson;


const dishes = [
  {
    name: "Paneer Tikka",
    price: 180,
    category: "Food",
    isVegetarian: true,
  },
  {
    name: "Veg Biryani",
    price: 220,
    category: "Food",
    isVegetarian: true,
  },
  {
    name: "Chicken Biryani",
    price: 280,
    category: "Food",
    isVegetarian: false,
  },
  {
    name: "Masala Dosa",
    price: 140,
    category: "Food",
    isVegetarian: true,
  },
  {
    name: "Cold Coffee",
    price: 120,
    category: "Beverage",
    isVegetarian: true,
  },
  {
    name: "Chicken Tikka",
    price: 260,
    category: "Food",
    isVegetarian: false,
  },
  {
    name: "Fresh Lime Soda",
    price: 90,
    category: "Beverage",
    isVegetarian: true,
  },
];

const vegetarianDishes = dishes.filter((dish) => dish.isVegetarian);

const formattedMenu = dishes.map((dish) => `${dish.name} – Rs ${dish.price}`);

const totalMenuPrice = dishes.reduce((total, dish) => total + dish.price, 0);

console.log("TASK 2 — VEGETARIAN DISHES");
console.log(vegetarianDishes);

console.log("TASK 2 — FORMATTED MENU");
console.log(formattedMenu);

console.log("TASK 2 — TOTAL PRICE");
console.log(`Rs ${totalMenuPrice}`);

document.querySelector("#menuSummary").innerHTML = `
      <p><strong>Vegetarian dishes:</strong> ${vegetarianDishes.length}</p>
      <p><strong>Formatted menu:</strong> ${formattedMenu.join(" | ")}</p>
      <p><strong>Total price:</strong> Rs ${totalMenuPrice}</p>
    `;


const orderForm = document.querySelector("#orderForm");
const dishNameInput = document.querySelector("#dishName");
const quantityInput = document.querySelector("#quantity");
const formError = document.querySelector("#formError");
const cartList = document.querySelector("#cartList");

orderForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const dishName = dishNameInput.value.trim();
  const quantity = Number(quantityInput.value);

  formError.textContent = "";

  if (!dishName || !quantityInput.value.trim()) {
    formError.textContent = "Please enter both dish name and quantity.";
    return;
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    formError.textContent = "Quantity must be a whole number greater than 0.";
    return;
  }

  const listItem = document.createElement("li");
  listItem.textContent = `${dishName} × ${quantity}`;
  cartList.appendChild(listItem);

  orderForm.reset();
  dishNameInput.focus();
});


const API_URL = "https://jsonplaceholder.typicode.com/users";
const STORAGE_KEY = "sectionB_favouriteRestaurant";

const restaurantStatus = document.querySelector("#restaurantStatus");
const restaurantError = document.querySelector("#restaurantError");
const restaurantList = document.querySelector("#restaurantList");
const favouriteRestaurant = document.querySelector("#favouriteRestaurant");

function getSavedFavourite() {
  return localStorage.getItem(STORAGE_KEY);
}

function saveFavourite(name) {
  localStorage.setItem(STORAGE_KEY, name);
}

function renderFavourite(name) {
  favouriteRestaurant.textContent = name || "None selected";

  document.querySelectorAll(".restaurant-button").forEach((button) => {
    button.classList.toggle("favourite", button.dataset.name === name);
  });
}

async function loadRestaurants() {
  restaurantStatus.textContent = "Loading restaurants…";
  restaurantError.textContent = "";
  restaurantList.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    users.forEach((user) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "restaurant-button";
      button.dataset.name = user.name;
      button.textContent = user.name;

      button.addEventListener("click", () => {
        saveFavourite(user.name);
        renderFavourite(user.name);
      });

      restaurantList.appendChild(button);
    });

    restaurantStatus.textContent = "Restaurants loaded successfully.";

    renderFavourite(getSavedFavourite());
  } catch (error) {
    console.error("Task 4 fetch error:", error);
    restaurantStatus.textContent = "";
    restaurantError.textContent =
      "Unable to load restaurants. Please check your internet connection and try again.";
  }
}
loadRestaurants();
