const fs = require("fs").promises;
const path = require("path");
const short = require("short-uuid");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(data));
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(id) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const oneContact = contactsArr.find((contact) => contact.id === id);
    return console.log(oneContact || null);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(id) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const index = contactsArr.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    const result = contactsArr.splice(index, 1);
    //const contactsNew = contactsArr.filter((contact) => contact.id !== id);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr, null, 2));
    return console.log("result", result);
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const newContact = {
      id: short.generate("0123456789"),
      name,
      email,
      phone,
    };
    contactsArr.push(newContact); // const newContactsArr = [...contactsArr, contactNew];
    await fs.writeFile(
      //why not fs.appendFile(filename, data, [options])
      contactsPath,
      JSON.stringify(contactsArr, null, 2),
      "utf8"
    );
    return console.log(contactsArr);
  } catch (error) {
    console.error(error.message);
  }
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
