import { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../actions'

class LogoutPage extends Component {

  componentWillMount() {
    this.props.logout();
    this.props.history.go(-1);
  }

  render() {
    return null
  }
}

export default connect(null, actions)(withRouter(LogoutPage))
