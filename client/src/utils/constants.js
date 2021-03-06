export const URL = "/clients";

export const LANDING = {
  header: "CRM",
  subHeader: "manage your success",
  usernameHeader: "Welcome"
};

export const NAV_LINKS_TITLES = {
  home: "Home",
  clients: "Clients",
  actions: "Actions",
  analytics: "Analytics",
  logout: "Logout",
  login: "Login",
  register: "Register",
  welcome: "hey"
};

export const NAV_LINKS = {
  authUser: ["home", "clients", "actions", "analytics", "logout"],
  guestUser: ["login", "register"]
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

export const CLIENTS_TABLE = {
  sold: "V",
  notSold: "-",
  noResults: "Sorry, no results found"
};

export const CLIENT_PAGINATION = {
  next: "next",
  prev: "previous"
};

export const EDIT_CLIENT = {
  updateBtn: "Update"
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
    sold: "Sale was already declared!"
  },
  addClient: {
    firstName: "You must add the client's first name",
    surname: "You must add the client's surname",
    country: "You must add the client's country",
    owner: "You must add the client's owner",
    minChar: "must have 3 or more characters"
  },
  success: {
    update: {
      owner: "Owner has been changed!",
      emailType: "Email type has been changed!",
      sold: "Sale has been declared!",
      general: "Client was updated!"
    },
    addClient: "Client has been added!"
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
  deepBlue: "#31415d", //brown
  primaryBlue: "#4f6b8d", //yellow
  secondaryBlue: "#738ba4", //orange
  lightestBlue: "#b1cfe7", // lightgray
  backgroundGray: "#f5f5f5", //same
  lightBlue: "#89a1b8" // cyan
};

export const SELECT = {
  default: "All"
};

export const CLIENT_ACQ_HEADERS = {
  salesByYear: "Sales by Year",
  salesCom: "Sales comparison"
};

export const ANALYTICS_HEADERS = {
  salesByCategory: "Sales by",
  clientAq: "Client Acquisition",
  salesByMonth: `2018's Sales by Month`,
  topEmployees: "Top Employees"
};

export const AUTH_HEADERS = {
  register: "Register",
  login: "Login"
};

export const AUTH_BUTTONS = {
  register: "sign up",
  login: "login"
};

export const AUTH_SUB_HEADERS = {
  register: "Not your first time?",
  login: "New here?"
};

export const AUTH_ALERTS = {
  register: {
    name: "Please submit your name",
    email: "Please submit your email",
    password: "Please submit a password",
    minChar: "must have 3 or more characters",
    emailValidate: "Please submit a valid email address"
  },
  login: {
    email: "Please submit your email",
    password: "Please submit your password",
    error: "you submitted is incorrect.",
    fix: "Please submit the correct"
  }
};
