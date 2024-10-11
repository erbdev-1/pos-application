const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
  },
  { timestamps: true } /* To find out when it was added*/
);

const Category = mongoose.model("categories", CategorySchema);
module.exports = Category;
