import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import FlashMessage from './FlashMessage';

class Header extends Component {
  // renderErrorMessage() {
  //   if (this.props.flash !== null) {
  //     return (
  //       <div className={`alert ${this.props.flash.className} role=alert`}>
  //         {this.props.flash.msg}
  //         <button onClick={this.props.closeFlash} className="close">
  //           <span>&times;</span>
  //         </button>
  //       </div>
  //     );
  //   }
  // }

  handleClick() {
    this.props.logout();
  }

  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return [
          <LinkContainer key={1} to="/login" isActive={()=>{return this.props.page === 'login'}}>
            <NavItem>
              Login
            </NavItem>
          </LinkContainer>,
          <LinkContainer key={2} to="/register" isActive={()=>{return this.props.page === 'register'}}>
            <NavItem>
              Register
            </NavItem>
          </LinkContainer>
        ];
      default:
        return [
          <LinkContainer key={1} to="/campgrounds" isActive={()=>{return false}}>
            <NavItem>
              Sign In As {this.props.auth.username}
            </NavItem>
          </LinkContainer>,
          <NavItem key={2} onClick={() => this.handleClick()} >
            Logout
          </NavItem>
        ];
    }
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link className="navbar-brand" to="/">
                YelpCamp
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to="/campgrounds" isActive={()=>{return this.props.page === 'home'}}>
                <NavItem>
                  Home
                </NavItem>
              </LinkContainer>
            </Nav>
            <Nav pullRight>
              {this.renderContent()}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="container">
          <FlashMessage/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    flash: state.flash
  };
}

export default connect(mapStateToProps, actions)(Header);
