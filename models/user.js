const mongoose = require("mongoose");
import Recipe from "./recipe";

const user = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
  },
  recipes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", user);

module.exports = User;
