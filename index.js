const express = require("express");
const path = require("path");
const app = express();

// Mock meals data
const meals = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    image: "/images/burger.png",
    price: 12.99,
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description: "Crispy romaine lettuce, grilled chicken, and Caesar dressing.",
    image: "/images/pasta.png",
    price: 9.99,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description: "Traditional Italian pizza with tomato, mozzarella, and basil.",
    image: "/images/pizza.png",
    price: 14.99,
  },
];

// Serve static images from the public directory
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Meals API endpoint
app.get("/meals", (req, res) => {
  const host = `${req.protocol}://${req.get("host")}`;
  const mealsWithHostImages = meals.map((meal) => ({
    ...meal,
    image: `${host}${meal.image}`,
  }));

  res.json(mealsWithHostImages);
});

// Export the app for Vercel
module.exports = app;
