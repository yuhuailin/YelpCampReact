import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class FlashMessage extends Component {
  render() {
    if (this.props.flash !== null) {
      return (
        <div className={`alert ${this.props.flash.className} role=alert`}>
          {this.props.flash.msg}
          <button onClick={this.props.closeFlash} className="close">
            <span>&times;</span>
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    flash: state.flash
  };
}

export default connect(mapStateToProps,actions)(FlashMessage);
