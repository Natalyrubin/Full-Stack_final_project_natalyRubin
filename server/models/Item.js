const mongoose = require("mongoose");
const { imageSchema, reviewSchema } = require("./common");
const { ref } = require("joi");



const itemSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  description: String,
  category: String,
  brand: String,
  image: imageSchema,
  reviews: [reviewSchema],
  price: Number,
  rating: Number,
  stock: Boolean,
}, {
  timestamps: true
});



/**
 * @param {string} searchTerm - Your search term (case insensitive)   : 'your search term'
 * @param {Array.<String>} searchFields - The fields to search inside : ['title','email',...]
 */

itemSchema.statics.multipleFieldsStringSearch = function (searchTerm, searchFields) {
  const query = {
    $or:
      [
        ...searchFields.map(field => ({
          [field]: new RegExp(searchTerm, 'i')
        }))
      ]
  };
  return this.find(query);
};

// -------------------------------------------------------------------------------------/


const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
