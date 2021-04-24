const express = require("express");
const router = express.Router();
const validations = require("../validations/validations");
const mail = require("../controllers/email");

router.get("/set-correo", (req, res) => {
  res.render("formularioEmail");
});

router.post("/set-correo", async (req, res) => {
  let email = req.body;
  let val = validations.validateEmail(email);
  if (val.result) {
    let result = await mail.registerEmail(email);
    res.send(result);
  } else {
    console.log("Error al validar el email:\n", val.error);
    res.send(val.error.message);
  }
});

module.exports = router;
