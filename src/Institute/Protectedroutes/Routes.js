import React from 'react';
import{ Route, Redirect } from "react-router-dom";
import store from '../../Redux/store/storage'


export const AlumniRoute = ({component : Component, ...rest}) => {   //Only Alumni Routes
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user;
                return (loginstate && loginuser === 'alumni') ? 
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

export const NoStudentRoute = ({component : Component, ...rest}) => {  //Except Students Routes
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user;
                return (loginstate && loginuser !== 'student') ? 
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

export const CnARoute = ({component : Component, ...rest}) => {  //College and Admin Route
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user;
                return (loginstate && (loginuser === 'college' || loginuser === 'admin')) ? 
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

export const NoCollegeRoute = ({component : Component, ...rest}) => {   //Except College Route
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user;
                return (loginstate && loginuser !== 'college') ? 
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

export const AdminRoute = ({component : Component, ...rest}) => {   //Only Admin Route
    return(
        <Route {...rest} render = {
            (props) => {
                let state = store.getState();
                let loginstate = state.Auth_state;
                let loginuser = state.Auth_user
                return (loginstate && loginuser === 'admin') ? 
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