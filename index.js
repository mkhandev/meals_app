const express = require("express");
const path = require("path");
const app = express();

// Mock meals data
const meals = [
  {
    id: 1,
    name: "Spaghetti Bolognese",
    description: "A classic Italian pasta dish with rich meat sauce.",
    image: "/images/beef-tacos.jpg",
    price: 12.99,
  },
  {
    id: 2,
    name: "Chicken Caesar Salad",
    description:
      "Crispy romaine lettuce, grilled chicken, and Caesar dressing.",
    image: "/images/caesar-salad.jpg",
    price: 9.99,
  },
  {
    id: 3,
    name: "Margherita Pizza",
    description:
      "Traditional Italian pizza with tomato, mozzarella, and basil.",
    image: "/images/chicken-curry.jpg",
    price: 14.99,
  },
];

// Middleware to serve static files from "public/images"
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Meals API endpoint
app.get("/meals", (req, res) => {
  const host = `${req.protocol}://${req.get("host")}`;
  const mealsWithHostImages = meals.map((meal) => ({
    ...meal,
    image: `${host}${meal.image}`, // Append host to image paths
  }));

  res.json(mealsWithHostImages);
});

// Export the app for Vercel
module.exports = app;

// Start the server locally if not running in Vercel
if (require.main === module) {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
