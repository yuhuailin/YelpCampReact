import React, { Component } from "react";
import Header from './header/Header';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.setState({
      username: "",
      password: ""
    });
    this.props.login(this.state, this.props.history);
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <Header page="login" />
        <div className="row">
          <h1 style={{ textAlign: "center" }}>Login</h1>
          <div style={{ width: "30%", margin: "25px auto" }}>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>
                  Username
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label>
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-lg btn-primary btn-block">
                  Login
                </button>
              </div>
            </form>
            <Link to="/campgrounds">Go Back</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, actions)(withRouter(Login));
