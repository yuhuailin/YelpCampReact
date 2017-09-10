import React, { Component } from "react";
import CampgroundForm from "./CampgroundForm";
import CampgroundFormReview from "./CampgroundFormReview";
import { reduxForm } from "redux-form";

class CampgroundNew extends Component {
  // constructor
  state = { showFormReview: false };

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

export default reduxForm({
  form: "campgroundForm"
})(CampgroundNew);
