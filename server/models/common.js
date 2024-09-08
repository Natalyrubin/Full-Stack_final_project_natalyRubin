const mongoose = require('mongoose');



const reviewSchema = new mongoose.Schema({
  rating: Number,
  comment: String,
  reviewerName: String,
}, {
  timestamps: true
});



const addressSchema = new mongoose.Schema({
  state: String,
  country: String,
  city: String,
  street: String,
  houseNumber: Number,
  zip: String,
})

const imageSchema = new mongoose.Schema({
  url: String,
  alt: String,
})

const nameSchema = new mongoose.Schema({
  first: String,
  last: String,
})

module.exports = { addressSchema, imageSchema, nameSchema, reviewSchema }