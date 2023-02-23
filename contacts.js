const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

const readContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    console.log(data);
  } catch (error) {
    console.error(error.message);
  }
};
const writeContacts = async () => {
  try {
    const rewriteData = await fs.writeFile(contactsPath, data);
    console.log(rewriteData);
  } catch (error) {
    console.error(error.message);
  }
};
module.exports = {
  readContacts,
  writeContacts,
};

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return console.table(JSON.parse(data));
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf8");
    const contactsArr = JSON.parse(contacts);
    contactsArr.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error.message);
  }
}

function removeContact(contactId) {
  // ...твой код
}

function addContact(name, email, phone) {
  // ...твой код
}
