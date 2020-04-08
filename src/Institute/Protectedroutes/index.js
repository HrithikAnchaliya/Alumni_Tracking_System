import React from 'react';
import{ Route, Redirect } from "react-router-dom";

export const auth = false;
export const ProtectedRoute = ({component : Component, ...rest}) => {
    return(
        <Route {...rest} render = {
            (props) => {
                if(auth === true){
                return <Component {...rest}/>
                }
                else{
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}

