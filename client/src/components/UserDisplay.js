import _ from 'lodash';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./Header";
import * as actions from '../actions';

class UserDisplay extends Component {
  componentWillMount() {
    this.props.fetchSomeUser(this.props.match.params.id);
  }

  renderCampgrounds() {
    if (this.props.user !== null) {
      return _.map(this.props.user.campgrounds, (campground) => {
        return (
          <li key={campground._id}>
            <Link to={`/campgrounds/${campground._id}`}>{campground.name}</Link>
          </li>
        );
      });
    }
  }

  renderProfile() {
    if (this.props.user !== null) {
      return (
        <div>
          <Header page={''}/>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                  <h1>{this.props.user.firstName} {" "} {this.props.user.lastName} </h1>
                  <div className="thumbnail">
                      <img src={this.props.user.avatar} alt="user profile avatar" />
                      <div className="caption">
                          <a href={`mailto:${this.props.user.email}`}>
                              {this.props.user.email}
                          </a>
                      </div>
                  </div>
                  <p>
                  Fusce consectetuer aliquip convallis metus quis. Sodales sed accumsan at wisi mauris. Velit enim turpis ut pellentesque dapibus. Purus justo vestibulum. Vitae ante quia a consequat elit gravida interdum in.
                  Pretium pharetra adipiscing. Fermentum neque ac magna diam at. In varius augue. Vitae enim erat libero sit dolor risus aenean velit. Aliquam interdum quis et odio posuere sit dolor et.
                  </p>
              </div>
              <div className="col-md-8">
                  <h3>{this.props.user.username}s campgrounds: </h3>
                  <ul>
                    {this.renderCampgrounds()}
                  </ul>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderProfile()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userprofile
  };
}

export default connect(mapStateToProps, actions)(UserDisplay);
