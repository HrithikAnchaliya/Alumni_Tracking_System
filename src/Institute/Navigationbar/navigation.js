import React from 'react';
import { connect } from 'react-redux'
import {  NavLink } from "react-router-dom";
import './style.css'

class Navigation extends React.Component{

  console = () => {
    console.log(window.location.href)
  }

    render(){
      console.log(window.location.href);
        return(
            <div>
              <nav>
            <ul id="nav">
            {(!this.props.Auth) ? (
              <li>
                <NavLink strict to='/'>
                  Home
                </NavLink>
              </li>) : ( <li>
                <NavLink strict activeClassName='link-li' to='/dashboard'>
                  Dashboard
                </NavLink>
              </li> )}
              {(this.props.user !== 'college' && this.props.user !== 'admin' && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/user'>
                  Profile
                </NavLink>
              </li>) : ( null )}
              <li onClick={this.console}>
                <NavLink strict activeClassName='link-li' to='/events'>
                  Events
                </NavLink>
              </li>
              {/* <li>
                <NavLink activeClassName='link-li' to='/map'>
                  Map
                </NavLink>
              </li> */}
              <li>
                <NavLink strict  activeClassName='link-li' to='/jobs'>
                  Jobs
                </NavLink>
              </li>
              <li>
                <NavLink strict activeClassName='link-li' to='/newsletters'>
                  Newsletter
                </NavLink>
              </li>
              <li>
                <NavLink strict activeClassName='link-li' to='/interviews'>
                  Interview
                </NavLink>
              </li>
              <li id="sch">
                <NavLink strict activeClassName='link-li' to='/searchprofile'>
                Search People</NavLink>
              </li>
               {(this.props.user !== 'student' && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/chat'>
                  Chat
                </NavLink>
              </li>) : ( null )}
              {(this.props.user === 'college' && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/tickets'>
                  Tickets
                </NavLink>
              </li>) : ( null )}
               {(this.props.user === 'alumni' && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/funds'>
                  Funds
                </NavLink>
              </li>) : ( null )}
                {((this.props.user === 'college' || this.props.user === 'admin') && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/sendemail'>
                  Send Mail
                </NavLink>
              </li>) : ( null )}
              {(this.props.user === 'college' && this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/verify-alumni'>
                  Verify Alumni
                </NavLink>
              </li>) : ( null )}
              { 
              (this.props.Auth) ? (
                <li>
                <NavLink strict activeClassName='link-li' to='/logoff'>
                  Logout
                </NavLink>
              </li>) : (
                <li>
                <NavLink strict activeClassName='link-li' to='/login'>
                  Login
                </NavLink>
              </li>
              )
              }
              </ul>
          </nav>
            </div>
        )
    }
}

const mapStatesToProps = state => {
  return{
    Auth : state.Auth_state,
    user: state.Auth_user
  }
}


export default connect(mapStatesToProps,null) (Navigation);

