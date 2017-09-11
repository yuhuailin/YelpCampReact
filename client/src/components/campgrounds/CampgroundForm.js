import _ from "lodash";
import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import Header from '../header/Header';
import formFields from './formFields';
import renderFields from "../forms/renderFields";

class CampgroundForm extends Component {
  render() {
    return (
      <div className="row">
        <Header page={''}/>
        <h1 style={{textAlign:'center'}}>Create a New Campground</h1>
        <div style={{width:'30%', margin:'25px auto'}}>
          <form onSubmit={this.props.handleSubmit(this.props.onCampgroundSubmit)}>
            {renderFields(formFields)}
            <button type="submit" style={{width: '35%'}} className="btn btn-lg btn-primary pull-right">
              Next
            </button>
          </form>
          <Link to="/campgrounds" className="btn btn-lg btn-danger pull-left">
            cancel
          </Link>
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
