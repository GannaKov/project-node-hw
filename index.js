const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const invokeAction = async ({ action, id, email, phone }) => {
  switch (action) {
    case "list":
      await listContacts();
      break;
    case "get":
      await getContactById(id);
      break;
    case "add":
      // ... name email phone
      break;
  }
};
program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-t, --title, <type>")
  .option("-at, --author, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
