const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      await listContacts();
      break;
    case "get":
      await getContactById(id);
      break;
    case "add":
      await addContact(name, email, phone);
      break;
    case "remove":
      await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action, <type>")
  .option("-i, --id, <type>")
  .option("-n, --name, <type>")
  .option("-e, --email, <type>")
  .option("-p, --phone, <type>");

program.parse();

const options = program.opts();
invokeAction(options);
// {
//     "id": "1",
//     "name": "Allen Raymond",
//     "email": "nulla.ante@vestibul.co.uk",
//     "phone": "(992) 914-3792"
//   },
// {
//     "id": "2",
//     "name": "Chaim Lewis",
//     "email": "dui.in@egetlacus.ca",
//     "phone": "(294) 840-6685"
//   },
