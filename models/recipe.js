const mongoose = require("mongoose");

const recipe = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
  },
  instructions: {
    type: String,
  },
  steps: {
    type: Array,
    required: true,
  },
  userId: {
    type: String,
  },
});

const Recipe = mongoose.models.Recipe || mongoose.model("Recipe", recipe);

module.exports = Recipe;
