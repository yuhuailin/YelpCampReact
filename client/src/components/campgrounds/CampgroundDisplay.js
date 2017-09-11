import _ from "lodash";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../Header";
import GoogleMap from "../GoogleMap";
import Moment from "react-moment";
import * as actions from "../../actions";
import CommentList from '../comments/CommentList';

class CampgroundDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleCampgroundDelete = this.handleCampgroundDelete.bind(this);
  }

  componentWillMount() {
    this.props.fetchSomeCampground(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearSomeCampground();
  }

  handleCampgroundDelete(event) {
    this.props.deleteCampground(this.props.match.params.id, this.props.history);
    event.preventDefault();
  }

  handleCommentChange(event) {
    this.setState({value: event.target.value});
  }

  handleCommentSubmit(event) {
    this.props.submitComment(this.props.match.params.id, this.state.value, this.props.history);
    event.preventDefault();
    this.setState({value:''});
  }

  renderManageOptions(isAuth, campground) {
    if (isAuth) {
      return (
        <div>
          <Link
            className="btn btn-md btn-warning"
            style={{ marginRight: "10px" }}
            to={`/campgrounds/${campground._id}/edit`}
          >
            Edit
          </Link>
          <form className="deleteForm" onSubmit={this.handleCampgroundDelete}>
            <button className="btn btn-md btn-danger">Delete</button>
          </form>
        </div>
      );
    }
  }

  renderSomeCampground() {
    if (this.props.campground !== null) {
      var auth = this.props.auth;
      var campground = this.props.campground;
      var isAuth = auth !== false ? campground.author.id === auth._id : false;
      isAuth = isAuth || auth.isAdmin;
      return (
        <div>
          <Header page={""} />
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <p className="lead">Yelp Camp</p>
                <div className="list-group">
                  <li className="list-group-item active">info 1</li>
                  <li className="list-group-item">info 2</li>
                  <li className="list-group-item">info 3</li>
                </div>
                <div id="map">
                  <GoogleMap
                    center={{
                      lat: campground.lat,
                      lng: campground.lng
                    }}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onMapLoad={_.noop}
                  />
                </div>
              </div>
              <div className="col-md-9">
                <div className="thumbnail">
                  <img
                    alt=""
                    className="img-responsive"
                    src={campground.image}
                  />
                  <div className="caption-full">
                    <h4 className="pull-right">${campground.price}/Night</h4>
                    <h4>
                      <a>{campground.name}</a>
                    </h4>
                    <p>{campground.description}</p>
                    <div>
                      <em>
                        Submitted by:{" "}
                        <Link to={`/users/${campground.author.id}`}>
                          {campground.author.username}
                        </Link>,{" "}
                        <Moment format="YYYY/MM/DD HH:mm">
                          {campground.createdAt}
                        </Moment>
                      </em>
                      {this.renderManageOptions(isAuth, campground)}
                    </div>
                  </div>
                </div>
                <div className="well">
                  <div>
                    <form onSubmit={this.handleCommentSubmit} className="form">
                      <div className="form-group">
                        <textarea type="text" value={this.state.value} onChange={this.handleCommentChange} className="form-control" placeholder="Enter comment" />
                      </div>
                      <div className="form-group">
                        <button disabled={this.state.value.length === 0} type="submit" className="btn btn-success">Add a comment</button>
                      </div>
                    </form>
                  </div>
                  <hr />
                  <CommentList />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return <div>{this.renderSomeCampground()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    campground: state.campground,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(CampgroundDisplay);
