import React, { Component } from "react";
import CampgroundForm from "./CampgroundForm";
import CampgroundFormReview from "./CampgroundFormReview";
import { reduxForm } from "redux-form";
import { connect } from 'react-redux';
import * as actions from '../../actions';

class CampgroundNew extends Component {
  // constructor
  state = { showFormReview: false };

  componentWillMount() {
    if (this.props.auth === false) {
      this.props.loginError(this.props.history);
    }
  }

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <CampgroundFormReview
          onCancel={() => this.setState({ showFormReview: false })}
        />
      );
    }
    return (
      <CampgroundForm
        onCampgroundSubmit={() => this.setState({ showFormReview: true })}
      />
    );
  }

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

function mapStateToProps( state ) {
  return { auth: state.auth };
}

export default reduxForm({
  form: "campgroundForm"
})(connect(mapStateToProps,actions)(CampgroundNew));
