import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './style.css'

class Navigation extends React.Component{
    render(){
        return(
            <div>
              <nav>
            <ul id="nav">
              <li>
                <Link to='/'>
                  Home
                </Link>
              </li>
              {(this.props.user !== 'college') ? (
                <li>
                <Link to='/user'>
                  Profile
                </Link>
              </li>) : ( null )}
              <li>
                <Link to='/events'>
                  Events
                </Link>
              </li>
              <li>
                <Link to='/map'>
                  Map
                </Link>
              </li>
              <li>
                <Link to='/jobs'>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to='/newsletters'>
                  Newsletter
                </Link>
              </li>
              <li>
                <Link to='/interviews'>
                  Interview
                </Link>
              </li>
              <li id="sch">
                <Link to='/searchprofile'>
                Search People</Link>
              </li>
              { 
              (this.props.Auth) ? (
                <li>
                <Link to='/logoff'>
                  Logout
                </Link>
              </li>) : (
                <li>
                <Link to='/login'>
                  Login
                </Link>
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
