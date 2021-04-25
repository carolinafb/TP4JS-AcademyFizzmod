const express = require("express");
const router = express.Router();
const validations = require("../validations/validations");
const mail = require("../controllers/email");

router.get("/set-correo", (req, res) => {
  res.render("formEmail");
});

router.post("/set-correo", async (req, res) => {
  let email = req.body;
  let val = validations.validateEmail(email);
  let message = "mensaje informativo";
  if (val.result) {
    message = await mail.registerEmail(email);
  } else {
    message = "Error al validar el email";
    console.log(message, ":\n", val.error);
  }
  res.render("menssages", { message });
});

module.exports = router;
