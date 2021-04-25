const express = require("express");
const router = express.Router();
const validations = require("../validations/validations");
const product = require("../controllers/product");

router.get("/", (req, res) => {
  res.render("formProduct");
});

router.get("/listar", async (req, res) => {
  let products = await product.giveMeAll();
  res.render("products", { products });
});

router.post("/ingreso", (req, res) => {
  let prod = req.body;
  let val = validations.validateProduct(prod);
  if (val.result) {
    product.createProduct(prod);
    res.redirect("/listar");
  } else {
    let message = "Error al validar el producto";
    console.log(message, ":\n", val.error);
    res.render("menssages", { message });
  }
});

module.exports = router;
