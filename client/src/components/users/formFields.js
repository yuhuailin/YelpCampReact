export default [
  {
    label: "Username",
    name: "username",
    type: "text",
    noValueError: "you must provide an username",
    required: "*"
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    noValueError: "you must provide a password",
    required: "*"
  },
  {
    label: "First Name",
    name: "firstName",
    type: "text",
    noValueError: "you must provide the first name",
    required: "*"
  },
  {
    label: "Last Name",
    name: "lastName",
    type: "text",
    noValueError: "you must provide the last name",
    required: "*"
  },
  {
    label: "Email Address",
    name: "email",
    type: "email",
    placeholder: "eg. yelpcamp@gmail.com",
    noValueError: "you must provide an email",
    required: "*"
  },
  {
    label: "Image URL",
    name: "avatar",
    type: "url",
    placeholder: "http://igbl-conference.com/2016/authors/author.png"
  },
  {
    label: "Admin Code (Optional)",
    name: "adminCode",
    type: "number",
    placeholder: "****"
  }
];
