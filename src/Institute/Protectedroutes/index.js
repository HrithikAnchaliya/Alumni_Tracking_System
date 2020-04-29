import React from 'react';
import{ Route, Redirect } from "react-router-dom";
import store from '../../Redux/store/storage'


export const ProtectedRoute = ({component : Component, ...rest}) => {
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


export const LoginRoute = ({component : Component, ...rest}) => {
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

export const LogoutRoute = ({component : Component, ...rest}) => {
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


