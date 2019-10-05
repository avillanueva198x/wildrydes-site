import React, { Fragment, Component } from 'react';
import {
  Collapse,
  NavbarToggler,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarBrand,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { NavLink as NavLinkRouter } from 'react-router-dom';
import Login from './Login';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
  state = {
    dropdownOpen: false,
    isAuthenticated: this.props.isAuthenticated
  };

  toogleHandler = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    const { isAuthenticated, decodedToken, logout } = this.props;
    console.log(isAuthenticated);
    let toolBarMenu = null;
    if (isAuthenticated) {
      toolBarMenu = (
        <Nav navbar>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/members'>
              Matches
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={NavLinkRouter} exact to='/lists'>
              Lists
            </NavLink>
          </NavItem>
        </Nav>
      );
    }

    let userInfoArea = isAuthenticated ? (
      <div className='dropdown'>
        <ButtonDropdown
          isOpen={this.state.dropdownOpen}
          toggle={this.toogleHandler}
        >
          <DropdownToggle caret color='primary'>
            Welcome {decodedToken.unique_name}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              <i className='fa fa-user'></i>Edit Profile
            </DropdownItem>
            <DropdownItem onClick={logout}>
              <i className='fa fa-sign-out'></i>Logout
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
      </div>
    ) : (
      <Login onLogin={this.loginHandler}></Login>
    );
    return (
      <Fragment>
        <Navbar
          className='navbar navbar-expand-md navbar-dark bg-primary'
          light
          expand='md'
        >
          <NavbarBrand tag={NavLinkRouter} exact to='/'>
            findYourMatch.com
          </NavbarBrand>
          <NavbarToggler />
          <Collapse navbar>{toolBarMenu}</Collapse>
          {userInfoArea}
        </Navbar>
      </Fragment>
    );
  }
}

export default withRouter(Navigation);
