import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import * as actions from '../actions';

// react router setup
import Landing from './Landing';
import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';
import CampgroundNew from './campgrounds/CampgroundNew';
import CampgroundDisplay from './campgrounds/CampgroundDisplay';
import CampgroundEdit from './campgrounds/CampgroundEdit';
import UserDisplay from './UserDisplay';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div onClick={this.props.closeFlash}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/campgrounds" component={Dashboard} />
            <Route exact path="/campgrounds/new" component={CampgroundNew} />
            <Route path="/campgrounds/:id/edit" component={CampgroundEdit} />
            <Route path="/campgrounds/:id" component={CampgroundDisplay} />
            <Route path="/users/:id" component={UserDisplay} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
