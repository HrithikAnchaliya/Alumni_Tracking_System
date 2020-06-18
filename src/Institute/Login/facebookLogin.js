import React from 'react';
import FacebookLogin from 'react-facebook-login';

export default class Facebookbutton extends React.Component{

    componentClicked = () => {
        console.log('Clicked')
    }
    responseFacebook = (response) => {
        console.log(response)
    }
    render(){
        return(
            <div>
                <FacebookLogin
                appId="890313481439468"
                autoLoad={true}
                fields="name,email,picture"
                // scope="public_profile, email"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />
            </div>
        );
    }
}