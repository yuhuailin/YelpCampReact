import React, { Component } from "react";
import UserForm from "./users/UserForm";
import { reduxForm } from "redux-form";

class UserNew extends Component {
  render() {
    return (
      <UserForm />
    );
  }
}

export default reduxForm({
  form: "userForm"
})(UserNew);
