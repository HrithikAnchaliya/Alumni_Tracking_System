import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import './style.css'

// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'

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
              {(this.props.user !== 'college' && this.props.user !== 'admin' && this.props.Auth) ? (
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
               {(this.props.user !== 'student' && this.props.Auth) ? (
                <li>
                <Link to='/chat'>
                  Chat
                </Link>
              </li>) : ( null )}
              {(this.props.user === 'college' && this.props.Auth) ? (
                <li>
                <Link to='/tickets'>
                  Tickets
                </Link>
              </li>) : ( null )}
               {(this.props.user === 'alumni' && this.props.Auth) ? (
                <li>
                <Link to='/funds'>
                  Funds
                </Link>
              </li>) : ( null )}
                {((this.props.user === 'college' || this.props.user === 'admin') && this.props.Auth) ? (
                <li>
                <Link to='/sendemail'>
                  Send Mail
                </Link>
              </li>) : ( null )}
              {(this.props.user === 'college' && this.props.Auth) ? (
                <li>
                <Link to='/verify-alumni'>
                  Verify Alumni
                </Link>
              </li>) : ( null )}
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

