import _ from "lodash";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import formFields from "./formFields";
import renderFields from "../forms/renderFields";
import { connect } from "react-redux";
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.register(this.props.formValues, this.props.history)
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Header page={"register"} />
        <div className="row">
          <h1 style={{ textAlign: "center" }}>Sign Up</h1>
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <form onSubmit={this.handleSubmit}>
              {renderFields(formFields)}
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-right"
              >
                Sign Up
              </button>
            </form>
            <Link to="/campgrounds" className="btn btn-lg btn-danger pull-left">
              cancel
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.map(formFields, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return { formValues: state.form.userForm.values };
}

export default reduxForm({
  validate,
  form: "userForm"
})(connect(mapStateToProps, actions)(withRouter(UserForm)));
