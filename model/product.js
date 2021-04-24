const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  photo: String,
});

const product = mongoose.model("products", productSchema);

module.exports = {
  product,
};
