import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.props.submitSearch(this.state.value);
    this.props.suggest(this.state.value);
    event.preventDefault();
  }

  handleClick(event) {
    this.props.submitIndexSearch(this.props.suggestion);
    this.setState({ value: this.props.suggestion });
  }

  suggest() {
    if (this.props.campgrounds.length === 0 && this.props.suggestion !== null) {
      return (
        <div className="container">
          <div className="pull-left">
              Did you mean &nbsp;
              <button
              type="button"
              style={{padding:0, paddingBottom:"3px"}}
              className="btn btn-link"
              onClick={this.handleClick}
              >
                {this.props.suggestion}
              </button>
              ?
          </div>
        </div>);
    }
  }

  render() {
    return (
      <header className="jumbotron">
        <div className="container">
          <h1>Welcome to YelpCamp!</h1>
          <p>View our hand-picked campgrounds from all over the world</p>
          <p>
            <Link className="btn btn-primary btn-lg" to="/campgrounds/new">
              Add New Campground
            </Link>
          </p>
          <form onSubmit={this.handleSubmit} className="form-inline">
            <div className="form-group">
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
                className="form-control"
              />
              <input type="submit" value="Search" className="btn btn-default" />
            </div>
          </form>
          <div className="row" style={{ marginTop:"10px"}}>
            {this.suggest()}
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    campgrounds: state.campgrounds,
    suggestion: state.suggestion
  };
}

export default connect(mapStateToProps, actions)(withRouter(Searchbar));
