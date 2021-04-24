const express = require("express");
const router = express.Router();
const validations = require("../validations/validations");
const product = require("../controllers/product");

router.get("/", (req, res) => {
  res.render("formularioProducto");
});

router.get("/listar", async (req, res) => {
  let products = await product.giveMeAll();
  res.render("productos", { products });
});

router.post("/ingreso", (req, res) => {
  let prod = req.body;
  let val = validations.validateProduct(prod);
  if (val.result) {
    product.createProduct(prod);
    res.redirect("/listar");
  } else {
    console.log("Error al validar el producto:\n", val.error);
    res.send(val.error.message);
  }
});

module.exports = router;
