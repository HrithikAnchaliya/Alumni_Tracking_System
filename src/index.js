import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './Institute/Style/style.css'
import Home from './Institute/Navigationbar/navbar.js'
import Login from './Institute/Login/login.js';
import Profilepage from './Institute/Profile/profilepage.js';
import Searchprofile from './Institute/Profile/searchprofile.js'
import Events from './Institute/Event/events.js';
import Addevents from './Institute/Event/addevent.js';
import Eventpage from './Institute/Event/eventpage.js';
import Jobs from './Institute/jobs/jobs.js';
import Addjobs from './Institute/jobs/addjobs.js';
import { ProtectedRoute } from './Institute/Protectedroutes/index'
import { Provider } from 'react-redux';
import store from './Redux/store/storage';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends React.Component {

  render() {
    return (
        <div>
          <div>
          <div id="navbar">
            <ul id="nav">
              <li>
                <Link to='/'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/profilepage'>
                  Profile
                </Link>
              </li>
              <li>
                <Link to='/events'>
                  Events
                </Link>
              </li>
              <li>
                <Link to='/jobs'>
                  Jobs
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  Login
                </Link>
              </li>
              <li id="sch">
                <Link to='/searchprofile'>
                Search People</Link>
              </li>
              </ul>
          </div>
          <div>
          </div>
        </div>

          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/login' component={Login}/>
            <ProtectedRoute path='/searchprofile' component={Searchprofile}/>
            <Route path='/profilepage' component={Profilepage}/>
            <ProtectedRoute path={`/events/:id`} component={Eventpage}/>
            <ProtectedRoute path='/events/addevent' exact component={Addevents}/>
            <Route path='/events' component={Events}/>
            <ProtectedRoute path='/jobs'  component={Jobs}/>
            <Route path='/addjobs' component={Addjobs}/>
            <Route path='*'  component={() => "Ain't Femilia .. (404 Not Found)"}/>
          </Switch>
        </div>
      );

    }
}



ReactDOM.render(
 
  <Provider store={store}>
      <Router> 
          <App/>
      </Router>
  </Provider>,
    document.getElementById('root')
);
