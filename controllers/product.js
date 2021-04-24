const model = require("../model/product");
const mail = require("../controllers/email");

let cantProducts = 0;

const createProduct = async (prod) => {
  const newProduct = new model.product(prod);
  newProduct.save(async (err) => {
    if (err) throw new Error(`Error en escritura del producto: ${err}`);
    cantProducts++;
    console.log("Producto incorporado. Cantidad de productos :", cantProducts);

    if (cantProducts % 10 == 0) {
      let allProducts = await giveMeAll();
      mail.sendEmail(allProducts);
    }
  });
};

const giveMeAll = async () => {
  let products = [];
  try {
    let query = {};
    products = await model.product.find(query).lean();
  } catch (error) {
    console.log("Error en la busqueda de productos");
  }
  return products;
};

module.exports = {
  createProduct,
  giveMeAll,
};
