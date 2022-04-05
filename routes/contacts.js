const { Router } = require("express");
const router = Router();
const fs = require("fs");
const contactsFile = fs.readFileSync("./contacts.json", "utf-8");
const contacts = JSON.parse(contactsFile);

router.get("/", (req, res) => {
  res.status(200).json("API rest movies");
});

router.get("/contacts", (req, res) => {
  res.status(200).json(contacts);
});

router.post("/contacts", (req, res) => {
  const { nombre, apellido, telefono, email } = req.body;
  if (!nombre || !apellido || !telefono || !email) {
    res.status(400).json({
      error: "Faltan datos",
    });
  } else {
    const newContact = {
      id: contacts.length + 1,
      nombre,
      apellido,
      telefono,
      email,
    };
    contacts.push(newContact);
    fs.writeFileSync("./contacts.json", JSON.stringify(contacts, null, " "));
    res.status(201).json(contacts);
  }
});

router.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, telefono, email } = req.body;
  const contactIndex = contacts.findIndex((contact) => contact.id == id);
  if (!nombre || !apellido || !telefono || !email) {
    res.status(400).json({
      error: "Faltan datos",
    });
  } else {
    if (contactIndex < 0) {
      res.status(404).json({
        error: "No existe el contacto",
      });
    } else {
      const newContact = {
        id,
        nombre,
        apellido,
        telefono,
        email,
      };
      contacts[contactIndex] = newContact;
      fs.writeFileSync("./contacts.json", JSON.stringify(contacts, null, " "));
      res.status(200).json(contacts);
    }
  }
});

router.get("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((contact) => contact.id == id);
  if (!contact) {
    res.status(404).json({
      error: "No existe el contacto",
    });
  } else {
    res.status(200).json(contact);
  }
});

router.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contactIndex = contacts.findIndex((contact) => contact.id == id);
  if (contactIndex < 0) {
    res.status(404).json({
      error: "No existe el contacto",
    });
  } else {
    contacts.splice(contactIndex, 1);
    fs.writeFileSync("./contacts.json", JSON.stringify(contacts, null, " "));
    res.status(200).json(contacts);
  }
});
module.exports = router;
