import _ from "lodash";
import React, { Component } from "react";
import Header from '../header/Header';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { withRouter } from "react-router-dom";
import formFields from "./formFields";

class CampgroundEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campground: this.props.campground
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    var camp = this.props.campground;
    camp[name] = value;

    this.setState({
      campground: camp
    });
  }

  handleSubmit(event) {
    this.props.editCampground(this.state.campground, this.props.history);
    event.preventDefault();
  }

  renderFields() {
    return _.map(formFields, ({ label, name, type, placeholder, required }) => {
      return (
        <div className="form-group" key={name}>
          <label>
            {label}
            <span style={{ color: "red" }}>{required}</span>
          </label>
          <input
            className="form-control"
            type={type}
            name={name}
            placeholder={placeholder}

            value={this.state.campground[name]}
            onChange={this.handleChange}
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="row">
        <Header page="" />
        <h1 style={{ textAlign: "center" }}>Edit Campground</h1>
        <div style={{ width: "30%", margin: "25px auto" }}>
          <form onSubmit={this.handleSubmit}>
            {this.renderFields()}
            <div className="form-group">
              <button
                type="submit"
                style={{ width: "35%" }}
                className="btn btn-lg btn-primary pull-right"
              >
                Submit
              </button>
            </div>
          </form>
          <Link to="./" className="btn btn-lg btn-danger pull-left">
            cancel
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { campground: state.campground };
}

export default connect(mapStateToProps, actions)(withRouter(CampgroundEdit));
