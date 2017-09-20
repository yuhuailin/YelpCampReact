import _ from "lodash";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Header from "../header/Header";
import formFields from "./formFields";
import renderFields from "../forms/renderFields";

class CampgroundForm extends Component {
  render() {
    return (
      <div>
        <Header page={""} />
        <div className="row">
          <h1 style={{ textAlign: "center" }}>New Campground</h1>
          <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <form
              onSubmit={this.props.handleSubmit(this.props.onCampgroundSubmit)}
            >
              {renderFields(formFields)}
              <button
                type="submit"
                style={{ width: "30%" }}
                className="btn btn-lg btn-primary pull-right"
              >
                Next
              </button>
            </form>
            <Link to="/campgrounds" className="btn btn-lg btn-danger pull-left">
              Cancel
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

export default reduxForm({
  validate,
  form: "campgroundForm",
  destroyOnUnmount: false
})(CampgroundForm);
