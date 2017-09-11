import React, { Component } from 'react';

// react router setup
import Header from './header/Header';
import Searchbar from './Searchbar';
import CampgroundList from './campgrounds/CampgroundList';

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header page="home"/>
        <div className="container">
          <Searchbar />
          <CampgroundList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
