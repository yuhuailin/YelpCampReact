import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";
import { Link } from "react-router-dom";

class CampgroundList extends Component {
  componentWillMount() {
    this.props.clearSomeCampground();
    this.props.fetchCampgrounds();
  }

  renderCampgrounds() {
    return this.props.campgrounds.map(campground => {
      return (
        <div key={campground._id} className="col-md-3 col-sm-6 col-xs-12">
          <div className="thumbnail">
            <div className="images">
              <img alt="campground pic" src={campground.image} />
            </div>
            <div className="caption">
              <h4>{campground.name}</h4>
            </div>
            <p>
              <Link
                to={`/campgrounds/${campground._id}`}
                className="btn btn-primary"
              >
                More Info
              </Link>
            </p>
          </div>
        </div>
      );
    });
  }

  render() {
    var divStyle = {
      display: "flex",
      flexWrap: "wrap"
    };
    return (
      <div className="row text-center" style={divStyle}>
        {this.renderCampgrounds()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campgrounds: state.campgrounds,
    suggestion: state.suggestion
  };
}

export default connect(mapStateToProps, actions)(CampgroundList);
