const fs = require("fs");
const nodemailer = require("nodemailer");

const file = "./fs/correo.dat";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "carofakefake@gmail.com",
    pass: "carofakefake123!",
  },
});

const createHtmlEmail = (info) => {
  return `
    <table >
        <tr> <th>Nombre</th> <th>Descripcion</th> <th>Precio</th> <th>Foto</th></tr>
        ${
          info &&
          info.map((product) => {
            return `<tr>
              <td>${product.name}</td>
              <td>${product.description}</td>
              <td>${product.price}</td>
              <td>
                <img
                  src=${product.photo}
                  alt=${product.name}
                  width="100"
                  height="150"
                />
              </td>
            </tr>`;
          })
        }
    </table>`;
};

const registerEmail = async (email) => {
  try {
    await fs.promises.writeFile(file, email.email);
    return `<h2>Email ${email.email} registrado correctamente!! </h2>`;
  } catch (error) {
    console.log(`Error en operación asincrónica de fs: ${error}`);
    return `<h2>No se pudo registrar el email </h2>`;
  }
};

const getEmail = async () => {
  try {
    email = await fs.promises.readFile(file, "utf-8");
    return email;
  } catch (error) {
    console.log(`Error en operación asincrónica de fs: ${error}`);
    return null;
  }
};

const sendEmail = async (info) => {
  let email = await getEmail();
  const mailOptions = {
    from: "carofakefake@gmail.com",
    to: email,
    subject: "Listado de productos",
    html: createHtmlEmail(info),
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      return err;
    }
    console.log(info);
  });
};

const checkEmailFromArch = async () => {
  try {
    console.log("Configurando archivo de email...");
    fs.access(file, async (err) => {
      if (err) {
        console.log("Creando correo.dat...");
        await fs.promises.writeFile(file, "carofakefake@gmail.com");
        console.log("correo.dat creado correctamente");
      } else {
        console.log("Archivo correo.dat existente");
      }
    });
  } catch (error) {
    console.log(`Error en operación asincrónica de fs: ${error}`);
  }
};

module.exports = {
  registerEmail,
  checkEmailFromArch,
  sendEmail,
};
