
const express = require('express');
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/wishlist
// @desc    Get user wishlist
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: {
        path: 'category',
        select: 'name slug'
      }
    });
    
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: []
      });
    }
    
    res.json(wishlist.items);
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/wishlist
// @desc    Add item to wishlist
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { productId } = req.body;
    
    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: []
      });
    }
    
    // Check if item already in wishlist
    const itemExists = wishlist.items.some(
      item => item.product.toString() === productId
    );
    
    if (!itemExists) {
      // Add new item to wishlist
      wishlist.items.push({
        product: productId,
        dateAdded: new Date()
      });
      
      const updatedWishlist = await wishlist.save();
      
      // Populate product details before sending response
      await updatedWishlist.populate({
        path: 'items.product',
        populate: {
          path: 'category',
          select: 'name slug'
        }
      });
      
      res.status(201).json(updatedWishlist.items);
    } else {
      res.status(200).json(wishlist.items);
    }
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/wishlist/:productId
// @desc    Remove item from wishlist
// @access  Private
router.delete('/:productId', protect, async (req, res) => {
  try {
    const { productId } = req.params;
    
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    
    if (!wishlist) {
      return res.status(404).json({ success: false, message: 'Wishlist not found' });
    }
    
    // Remove item from wishlist
    wishlist.items = wishlist.items.filter(
      item => item.product.toString() !== productId
    );
    
    const updatedWishlist = await wishlist.save();
    
    // Populate product details before sending response
    await updatedWishlist.populate({
      path: 'items.product',
      populate: {
        path: 'category',
        select: 'name slug'
      }
    });
    
    res.json(updatedWishlist.items);
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
