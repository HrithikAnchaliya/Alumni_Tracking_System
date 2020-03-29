import React from 'react';
import './style.css';

export default class Top extends React.Component {
    state = {
      showForm: false
    };
  
    searchjsx = () => {
      console.log("Toggled showForm");
      const value = this.state.showForm;
      this.setState({ showForm: !value});
    };
    

    render() {
      
      let togglevalue = null;
      
      if (this.state.showForm){
        togglevalue = (
          <div id='block'>
                <div id="searchdiv">
                  <form id="searchform">
                    <input type="text" id="input" name="search"></input>
                  </form>
                </div>
          </div>
        );
      }

      return (
          <div>
          <div id="navbar">
            <ul id="nav">
              <li>
                <a className="a" href="https://www.google.com/">
                  Home
                </a>
              </li>
              <li>
                <a className="b" href="https://www.google.com/">
                  Profile
                </a>
              </li>
              <li>
                <a className="c" href="https://www.google.com/">
                  Events
                </a>
              </li>
              <li>
                <a className="d" href="https://www.google.com/">
                  Login
                </a>
              </li>
              <li onClick={this.searchjsx} id="sch"><a href>
                Search..</a>
              </li>
              </ul>
          </div>
          <div>
          </div>
          {togglevalue}
        </div>
      );
    }
  }
