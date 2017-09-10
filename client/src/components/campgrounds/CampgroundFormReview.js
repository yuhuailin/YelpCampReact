import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import formFields from "./formFields";
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';
import Header from '../Header';

const CampgroundFormReview = ({ onCancel, formValues, submitCampground, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    if (name === 'image') {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>
              <img alt="campground pic" style={{width:'250px'}} src={formValues[name]}/>
          </div>
        </div>
      );
    }
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <Header page={''} />
      <div className="container">
        <h2>Review</h2>
        {reviewFields}
        <button style={{marginTop: '20px'}} className="btn btn-lg btn-warning pull-left" onClick={onCancel}>
          Back
        </button>
        <button
            style={{marginTop: '20px'}}
            onClick={() => submitCampground(formValues, history)}
            className="btn btn-lg btn-success pull-right"
          >
          Add campground
        </button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.campgroundForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(CampgroundFormReview));
