import _ from "lodash";
import Moment from "react-moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      comment: {},
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({editMode:false});
  }

  handleEdit(event) {
    event.preventDefault();
    this.props.editComment(this.props.campground._id, this.state.comment._id,this.state.value, this.props.history);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCommentEdit(comment) {
    this.setState({
      editMode: true,
      comment: comment,
      value: comment.text
    });
  }

  handleCommentDelete(comment) {
    this.props.deleteComment(this.props.campground._id, comment._id);
  }

  renderSingleComment(comment) {
    if (this.state.editMode && (comment._id === this.state.comment._id)) {
      return (
        <form className="form" onSubmit={this.handleEdit}>
          <div className="form-group">
            <input className="form-control" value={this.state.value} onChange={this.handleChange}/>
            <div style={{margin:'5px auto'}}>
              <button type="submit" className="btn btn-primary pull-right">Submit</button>
              <button style={{marginRight:'5px'}} className="btn btn-danger pull-right" onClick={()=>this.setState({editMode:false})}>Cancel</button>
            </div>
          </div>
        </form>
      );
    } else {
      return <span>{comment.text}</span>;
    }
  }

  renderManageCommentOptions(isAuth, campground, comment) {
    if (isAuth && !this.state.editMode) {
      return (
        <div className="pull-right">
          <button
            className="btn btn-xs btn-warning"
            onClick={() => this.handleCommentEdit(comment)}
          >
            Edit
          </button>
          <button
            onClick={() => this.handleCommentDelete(comment)}
            className="btn btn-xs btn-danger"
          >
            Delete
          </button>
        </div>
      );
    }
  }

  renderComments(auth, campground) {
    if (campground.comments !== []) {
      return _.map(campground.comments, comment => {
        var isAuth = auth !== false ? comment.author.id === auth._id : false;
        isAuth = isAuth || auth.isAdmin;
        return (
          <div className="row" key={comment._id}>
            <div className="col-md-12">
              <strong>{comment.author.username}</strong>
              <span className="pull-right">
                <Moment format="YYYY/MM/DD HH:mm">{comment.createdAt}</Moment>
              </span>
              <div>
                {this.renderSingleComment(comment)}
                {this.renderManageCommentOptions(isAuth, campground, comment)}
              </div>
            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>{this.renderComments(this.props.auth, this.props.campground)}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campground: state.campground,
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(CommentList);
