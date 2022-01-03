export const URL = "http://localhost:8100/clients/";

export const NAV_LINKS = {
  home: "Home",
  clients: "Clients",
  actions: "Actions",
  analytics: "Analytics",
  logout: "Logout",
  login: "Login",
  register: "Register"
};

export const CLIENTS_HEADERS = {
  name: "name",
  surname: "name",
  country: "country",
  firstContact: "firstContact",
  emailType: "emailType",
  sold: "sold",
  owner: "owner"
};

export const EMAIL_TYPES = ["A", "B", "C", "D", "No Type"];

export const IS_SOLD = ["Sold", "Not sold"];

export const ACTION_HEADERS = {
  main: { update: "update", addClient: "add client" },
  update: {
    client: "Client:",
    transferOwnership: "Transfer ownership to:",
    sendEmail: "Send email:",
    declareSale: "Declare sale!"
  },
  add: {
    firstName: "First Name:",
    surname: "Surname:",
    country: "Country:",
    owner: "Owner:",
    emailType: "Email Type:"
  }
};

export const ACTIONS_BUTTONS = {
  update: { transfer: "transfer", send: "send", declare: "declare" },
  add: { addNew: "Add New Client" }
};

export const ACTIONS_ALERTS = {
  update: {
    currentClient: "You must choose a client!",
    owner: "You must choose an owner!",
    emailType: "You must choose an email type!",
    declareSale: "Sale was already declared!"
  },
  addClient: {
    firstName: "You must add the client's first name",
    surname: "You must add the client's surname",
    country: "You must add the client's country",
    owner: "You must add the client's owner"
  }
};

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const SALES_BY_CATEGORY = {
  country: "Country",
  emailType: "EmailType",
  year: "Year",
  owner: "Owner"
};

export const COLORS = {
  brown: "#795548",
  yellow: "#f7ce3e",
  orange: "#ff884b",
  lightgray: "lightgray",
  backgroundGray: "#f5f5f5",
  cyan: "#00bfff"
};
