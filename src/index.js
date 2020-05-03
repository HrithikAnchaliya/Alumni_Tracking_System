import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './Institute/Style/style.css'
import Home from './Institute/Navigationbar/navbar.js'
import Navigation from './Institute/Navigationbar/navigation'
import Login from './Institute/Login/login.js';
import Logoff from './Institute/Login/logoff'
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
import RaiseTicket from './Institute/Tickets/RaiseTicket'
import Addnewsletter from './Institute/Newsletter/Addnewsletter'
import { ProtectedRoute, LoginRoute, LogoutRoute } from './Institute/Protectedroutes/index'
import { Provider } from 'react-redux';
import store from './Redux/store/storage';
import UserProfile from './Institute/temp_Profile/UserProfile';


class App extends React.Component {

  render() {
    return (
        <div>
          <div>
            <Navigation/>
          </div>
          <Switch>
            <Route path='/' exact component={Home}/>
            <LoginRoute path='/login' component={Login}/>
            <LogoutRoute path='/logoff' component={Logoff}/>
            <ProtectedRoute path='/searchprofile' component={Searchprofile}/>
            <Route path='/profilepage' component={Profilepage}/>
            <Route path='/user' component={UserProfile}/>
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
            <ProtectedRoute path='/raiseticket' exact component={RaiseTicket}/>
            <ProtectedRoute path='/addnewsletter' exact component={Addnewsletter}/>
            <LoginRoute path='/register' component={Register}/>
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
