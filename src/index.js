import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import './Institute/Style/Fonts/Futura Std Light Oblique.otf'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Institute/Style/style.css'
import Home from './Institute/Navigationbar/navbar.js'
import Navigation from './Institute/Navigationbar/navigation'
import Login from './Institute/Login/login.js';
import Logoff from './Institute/Login/logoff'
import Register from './Institute/Register/register'
// import Profilepage from './Institute/Profile/profilepage.js';
// import Searchprofile from './Institute/Profile/searchprofile.js'
import GeoJsonMap from './Institute/Map/leafletmap'
import Events from './Institute/Event/events.js';
import AddEvent from './Institute/Event/AddEvent';
import Eventpage from './Institute/Event/eventpage.js';
import Jobs from './Institute/jobs/Jobs.js';
import Jobpage from './Institute/jobs/Jobpage'
import Addjobs from './Institute/jobs/addjobs.js';
import InterviewPage from './Institute/Interview/Interviewpage'
import Interviews from './Institute/Interview/Interviews'
import Addinterview from './Institute/Interview/Addinterview'
import RaiseTicket from './Institute/Tickets/RaiseTicket'
import Newsletters from './Institute/Newsletter/Newsletters'
import { ProtectedRoute, LoginRoute, LogoutRoute, CollegeRoute } from './Institute/Protectedroutes/index'
import { AlumniRoute, NoStudentRoute, CnARoute, NoCollegeRoute } from './Institute/Protectedroutes/Routes'
import { Provider } from 'react-redux';
import store from './Redux/store/storage';
import UserProfile from './Institute/temp_Profile/UserProfile';
import EditPage from './Institute/temp_Profile/EditPage'
import users from './Institute/Search Profile/users';
import OtherProfile from './Institute/Search Profile/OtherProfile';
import Funds from './Institute/Funds/Funds';
import Import from './Institute/Import Alumni/import';
import NewsletterPage from './Institute/Newsletter/NewsletterPage';
import Addnewsletter from './Institute/Newsletter/Addnewsletter'
import FundsPage from './Institute/Funds/FundsPage';
import AddFund from './Institute/Funds/AddFund';
import Dashboard from './Institute/Dashboard/dashboard';
import Rooms from './Institute/Chat/Rooms';
import ChatRoom from './Institute/Chat/ChatRoom';
import SendEmail from './Institute/Email/SendEmail';



class App extends React.Component {

  render() {
    return (
        <div>
          <div id="navbar">
            <Navigation/>
          </div>
          <Switch>
            <Route path='/' exact component={Home}/>
            <LoginRoute path='/login' component={Login}/>
            <LogoutRoute path='/logoff' component={Logoff}/>
            <ProtectedRoute path='/searchprofile' component={users}/>
            <ProtectedRoute path={`/profile/:id`} component={OtherProfile}/>
            {/* <Route path='/profilepage' component={Profilepage}/> */}
            <Route path='/import' component={Import}/>
            <NoCollegeRoute path='/user' exact component={UserProfile}/>
            <ProtectedRoute path='/edit' exact component={EditPage}/>
            <ProtectedRoute path='/map' exact component={GeoJsonMap}/>
            <ProtectedRoute path={`/events/:id`} exact component={Eventpage}/>
            <CollegeRoute path='/addevent' exact component={AddEvent}/>
            <ProtectedRoute path='/events' exact component={Events}/>
            <ProtectedRoute path='/jobs' exact component={Jobs}/>
            <ProtectedRoute path={`/jobs/:id`}  component={Jobpage}/>
            <NoStudentRoute path='/addjobs' component={Addjobs}/>
            <ProtectedRoute path={`/interviews/:id`} component={InterviewPage}/>
            <ProtectedRoute path='/interviews' exact component={Interviews}/>
            <AlumniRoute path='/addinterview' exact component={Addinterview}/>
            <AlumniRoute path='/raiseticket' exact component={RaiseTicket}/>
            <ProtectedRoute path='/newsletters' exact component={Newsletters}/>
            <ProtectedRoute path={`/newsletters/:id`} component={NewsletterPage}/>
            <CnARoute path='/addnewsletter/' component={Addnewsletter}/>
            <LoginRoute path='/register' component={Register}/>
            <ProtectedRoute path='/funds' exact component={Funds}/>
            <ProtectedRoute path={`/funds/:id`} exact component={FundsPage}/>
            <CollegeRoute path='/addfund' exact component={AddFund}/>
            <CnARoute path='/dashboard/' component={Dashboard}/>
            <ProtectedRoute path='/chat' exact component={Rooms}/>
            <ProtectedRoute path={`/chatroom/:id`} exact component={ChatRoom}/>
            <ProtectedRoute path='/sendemail' exact component={SendEmail}/>
            <Route path='*'  component={() => "Ain't Femilia .. (404 Not Found)"}/>
          </Switch>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
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
