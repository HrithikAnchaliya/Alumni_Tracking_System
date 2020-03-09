import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Institute/Login/login.js';
import Top from './Institute/Navigationbar/navbar.js';
import Profilepage from './Institute/Profile/profilepage.js';
import Searchprofile from './Institute/Profile/searchprofile.js'
import Events from './Institute/Event/events.js'
import Addevents from './Institute/Event/addevent.js'
import Eventpage from './Institute/Event/eventpage.js'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class Routes extends React.Component {
    render() {

      return (

        <Router>
          <Switch>
            <Route path='/home' component={Top}/>
            <Route path='/login' component={Login}/>
            <Route path='/searchprofile' component={Searchprofile}/>
            <Route path='/profilepage' component={Profilepage}/>
            <Route path='/eventpage' component={Eventpage}/>
            <Route path='/addevent' component={Addevents}/>
            <Route path='/events' component={Events}/>
          </Switch>
        </Router>
      );
      }
    }


ReactDOM.render(
    <Routes/>, 
    document.getElementById('root')
);
