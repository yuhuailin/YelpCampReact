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
      <NavItem eventKey={1} {this.props.page === "home" ? "active" : ""}>
        <Link to="/campgrounds">Home</Link>
      </NavItem>
    </Nav>
    <Nav pullRight>
    <NavItem eventKey={1} {this.props.page === "home" ? "active" : ""}>
      <Link to="/campgrounds">Home</Link>
    </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
