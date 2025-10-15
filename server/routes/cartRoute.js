// backend/routes/cartRoute.js
const express = require("express");
const Cart = require("../models/Cart");
const mongoose = require("mongoose"); // Import mongoose for ID validation
const router = express.Router();

// GET cart for a specific user
router.get("/:userId", async (req, res) => {
  // ✅ Validation: Ensure the user ID is in a valid format before querying the database.
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    // ✅ Graceful Handling: If a user has no cart, send a success response with an empty array.
    if (!cart) {
      return res.status(200).json({ products: [] });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.error("SERVER ERROR in GET /api/cart/:userId:", err);
    res.status(500).json({ message: "Server error while fetching cart" });
  }
});

// ADD item to a specific user's cart
router.post("/:userId", async (req, res) => {
  // ✅ Validation: Check the user ID format.
  if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const { productId, name, description, image, price, quantity } = req.body;
    const userId = req.params.userId;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create one for this specific user.
      cart = new Cart({ userId, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity || 1;
    } else {
      cart.products.push({ productId, name, description, image, price, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("SERVER ERROR in POST /api/cart/:userId:", err);
    res.status(500).json({ message: "Error adding to cart" });
  }
});

// UPDATE item in a specific user's cart
router.put("/:userId/:productId", async (req, res) => {
  // ✅ Validation: Check both IDs.
  if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !req.params.productId) {
    return res.status(400).json({ message: "Invalid user or product ID format" });
  }
    
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    const product = cart.products.find(p => p.productId.toString() === req.params.productId);
    
    if (!product) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    // Ensure quantity is at least 1.
    product.quantity = Math.max(1, quantity);
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("SERVER ERROR in PUT /api/cart/:userId/:productId:", err);
    res.status(500).json({ message: "Error updating cart" });
  }
});

// REMOVE item from a specific user's cart
router.delete("/:userId/:productId", async (req, res) => {
  // ✅ Validation: Check both IDs.
  if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !req.params.productId) {
    return res.status(400).json({ message: "Invalid user or product ID format" });
  }

  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    cart.products = cart.products.filter(p => p.productId.toString() !== req.params.productId);
    
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    console.error("SERVER ERROR in DELETE /api/cart/:userId/:productId:", err);
    res.status(500).json({ message: "Error removing product" });
  }
});

module.exports = router;