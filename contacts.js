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

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    const contactsNew = contactsArr.filter(
      (contact) => contact.id !== contactId
    );
    console.log("contactNew", contactsNew);
    const newContacts = await fs.writeFile(
      contactsPath,
      JSON.stringify(contactsNew),
      "utf8"
    );
    console.log(newContacts);
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
    const newArr = contactsArr.push(newContact); // const newContactsArr = [...contactsArr, contactNew];
    const newContacts = await fs.writeFile(
      //why not fs.appendFile(filename, data, [options])
      contactsPath,
      JSON.stringify(newArr),
      "utf8"
    );
    console.log(newContacts);
  } catch {}
}
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
