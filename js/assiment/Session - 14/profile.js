import formatFollowers from "./instaHelpers.js";

console.log("Task 7 & 8");

const users = [
  {
    name: "User One",
    followers: 1200,
  },
  {
    name: "User Two",
    followers: 2500000,
  },
  {
    name: "User Three",
    followers: 850,
  },
];

users.forEach(function (user) {
  console.log(user.name + ": " + formatFollowers(user.followers));
});
