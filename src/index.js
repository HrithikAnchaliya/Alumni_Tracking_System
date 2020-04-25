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
import Register from './Institute/Register/register'
import Profilepage from './Institute/Profile/profilepage.js';
import Searchprofile from './Institute/Profile/searchprofile.js'
import GeoJsonMap from './Institute/Map/leafletmap'
import Events from './Institute/Event/events.js';
import Addevents from './Institute/Event/addevent.js';
import Eventpage from './Institute/Event/eventpage.js';
import Jobs from './Institute/jobs/Jobs.js';
import Jobpage from './Institute/jobs/Jobpage'
import Addjobs from './Institute/jobs/addjobs.js';
import InterviewPage from './Institute/Interview/Interviewpage'
import Interviews from './Institute/Interview/Interviews'
import Addinterview from './Institute/Interview/Addinterview'
import { ProtectedRoute } from './Institute/Protectedroutes/index'
import { Provider } from 'react-redux';
import store from './Redux/store/storage';


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
                <Link to='/interviews'>
                  Interview
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
            <ProtectedRoute path='/map' component={GeoJsonMap}/>
            <ProtectedRoute path={`/events/:id`} component={Eventpage}/>
            <ProtectedRoute path='/events/addevent' exact component={Addevents}/>
            <ProtectedRoute path='/events' exact component={Events}/>
            <ProtectedRoute path='/jobs' exact component={Jobs}/>
            <ProtectedRoute path={`/jobs/:id`}  component={Jobpage}/>
            <ProtectedRoute path='/addjobs' component={Addjobs}/>
            <ProtectedRoute path={`/interviews/:id`} component={InterviewPage}/>
            <ProtectedRoute path='/interviews' exact component={Interviews}/>
            <ProtectedRoute path='/addinterview' exact component={Addinterview}/>
            <Route path='/register' component={Register}/>
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
