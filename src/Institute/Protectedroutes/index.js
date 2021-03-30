import React from 'react';
import{ Route, Redirect } from "react-router-dom";
import store from '../../Redux/store/storage'


export const ProtectedRoute = ({component : Component, ...rest}) => {   //Routes which could be viewed only when logged in  
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                return (loginstate) ? 
                (
                    <Component {...rest}/>

                ) : (
                    <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                )
            }
        }/>
    )
}


export const LoginRoute = ({component : Component, ...rest}) => {  //Login Route (i.e, Cant load the logout page when logged out)
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                return (!loginstate) ? 
                (
                    <Component {...rest}/>

                ) : (
                    <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                )
            }
        }/>
    )
}

export const LogoutRoute = ({component : Component, ...rest}) => {   //Logout Route (i.e, Cant load the login page when logged in)
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                return (loginstate) ? 
                (
                    <Component {...rest}/>

                ) : (
                    <Redirect to={
                        {
                            pathname: "/",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                )
            }
        }/>
    )
}


export const CollegeRoute = ({component : Component, ...rest}) => {   //Only College Route
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user
                return (loginstate && loginuser === 'college') ? 
                (
                    <Component {...rest}/>

                ) : (
                    <Redirect to={
                        {
                            pathname: "/login",            //Why to login page?? (Its because when not loggedin it will redirt to login page)
                            state: {                       //if not then (i.e, Logged in then that protected route (another function) wil reditet to home)
                                from: props.location       //It was '/' (before) 
                            }
                        }
                    }/>
                )
            }
        }/>
    )
}
