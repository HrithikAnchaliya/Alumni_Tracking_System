import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Institute/Style/style.css'
import Home from './Institute/Navigationbar/navbar.js'
import Navigation from './Institute/Navigationbar/navigation'
import Login from './Institute/Login/login.js';
import Logoff from './Institute/Login/logoff'
import Register from './Institute/Register/register'
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
import { AlumniRoute, NoStudentRoute, CnARoute, AdminRoute } from './Institute/Protectedroutes/Routes'
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
import CreateChat from './Institute/Chat/CreateChat';
import VerifyAlumni from './Institute/Verify Alumni/VerifyAlumni';
import Tickets from './Institute/Tickets/Tickets';
import TicketPage from './Institute/Tickets/TicketPage'
import CreateCollegeChat from './Institute/Chat/CreateCollegeChat';
import PostNotice from './Institute/Notice/PostNotice';
import createCollege from './Institute/Create College/createCollege';
import ContactALumni from './Institute/ContactAlumni/ContactAlumni';
import CreateStaff from './Institute/CreateStaff/CreateStaff';


class App extends React.Component {

  render() {
    return (
        <div>
          <div id="navbar">
            <Navigation/>
          </div>
          <Switch>
            <Route path='/' exact component={Home}/>
            <LoginRoute path='/login' exact component={Login}/>
            <LogoutRoute path='/logoff' exact component={Logoff}/>
            <ProtectedRoute path='/searchprofile' exact component={users}/>
            <ProtectedRoute path={`/profile/:id`} exact component={OtherProfile}/>
            <ProtectedRoute path={`/profile/:id/contact`} component={ContactALumni}/>
            <CollegeRoute path='/import' component={Import}/>
            <AlumniRoute path='/user' exact component={UserProfile}/>
            <AlumniRoute path='/edit' exact component={EditPage}/>
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
            <CollegeRoute path='/tickets' exact component={Tickets}/>
            <CollegeRoute path={`/tickets/:id`} component={TicketPage}/>
            <ProtectedRoute path='/newsletters' exact component={Newsletters}/>
            <ProtectedRoute path={`/newsletters/:id`} component={NewsletterPage}/>
            <CnARoute path='/addnewsletter/' component={Addnewsletter}/>
            <LoginRoute path='/register' component={Register}/>
            <AlumniRoute path='/funds' exact component={Funds}/>
            <AlumniRoute path={`/funds/:id`} exact component={FundsPage}/>
            <CollegeRoute path='/addfund' exact component={AddFund}/>
            <ProtectedRoute path='/dashboard/' component={Dashboard}/>
            <NoStudentRoute path='/chat' exact component={Rooms}/>
            <NoStudentRoute path={`/chat/:id`} exact component={ChatRoom}/>
            <NoStudentRoute path='/createchat' exact component={CreateChat}/>
            <CollegeRoute path='/createchat-college' exact component={CreateCollegeChat}/>
            <CnARoute path='/sendemail' exact component={SendEmail}/>
            <CollegeRoute path='/verify-alumni' exact component={VerifyAlumni}/>
            <CnARoute path='/createnotice' component={PostNotice}/>
            <AdminRoute path='/createcollege' component={createCollege}/>
            <CollegeRoute path='/add-faculty' exact component={CreateStaff}/>
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
