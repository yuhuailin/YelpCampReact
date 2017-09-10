import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

class Header extends Component {
  renderErrorMessage() {
    if(this.props.flash !== null) {
      return (
        <div className={`alert ${this.props.flash.className} role=alert`}>
          {this.props.flash.msg}
          <button onClick={this.props.closeFlash} className="close">
            <span>&times;</span>
          </button>
        </div>
      );
    }
  }
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <li key="1" className={this.props.page === 'login' ? 'active' : ''}>
            <Link to="/login">Login</Link>
          </li>,
          <li key="2" className={this.props.page === 'register' ? 'active' : ''}>
            <Link to="/register">Register</Link>
          </li>
        ];
      default:
        return [
          <li key="11">
            <Link to="/campgrounds">Sign In As {this.props.auth.username}</Link>
          </li>,
          <li key="22">
            <Link to="/logout">Logout</Link>
          </li>
        ];
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <Link className="navbar-brand" to="/">
                YelpCamp
              </Link>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className={this.props.page === 'home' ? 'active' : ''}>
                  <Link to="/campgrounds">Home</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {this.renderContent()}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          {this.renderErrorMessage()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return (
    {
      auth: state.auth,
      flash: state.flash
    });
}

export default connect(mapStateToProps, actions)(Header);
