import React from 'react';
import { connect } from 'react-redux'
import Auth_True from '../../Redux/action/actions'
import Remove_token from '../../Redux/action/removetoken'
import { Redirect } from 'react-router-dom';
import { base_url_user } from '../../Endpoint/endpoint'




class Logoff extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false
        }
        
        this.officiallogoff = this.officiallogoff.bind(this);
        this.toRedirect = this.toRedirect.bind(this);
    }

    async officiallogoff(){
        const deserialized_token = JSON.parse( window.localStorage.getItem('Auth_token'));
        const values = {
            method : "delete",
            headers : {
                'x-auth' : deserialized_token
            }
        }
        try{
        await fetch(`${base_url_user}/logout`,values)
        window.localStorage.removeItem('Auth_state')
        window.localStorage.removeItem('Auth_token')
        window.localStorage.removeItem('Auth_user')
        await this.props.removetoken();
        this.toRedirect();
        }
        catch(error){
            console.log(error)
        }
    }

    toRedirect = () => {
        if(!this.props.Auth){
            this.setState({
                redirect : true
            })
        }
    }

    
    render(){
        return(
            <div>
                <br/>
                <br/>
                <div className="container">
                    <div className="notification">
                    <br/>
                        <button onClick={this.officiallogoff} type='button'>Log-off</button>
                    <br/>
                    {
                        (this.state.redirect) ? (
                            <Redirect to="/login"/>
                        ) : (
                            null
                        )
                    }
                    </div>
                </div>
            </div>
    )}
}

const mapStatesToProps = state => {
    return{
        Auth : state.Auth_state
    }
}

const mapDispatchToProps = dispatch => {
    return{
        change_state_true : () => dispatch(Auth_True()),
        removetoken : () => dispatch(Remove_token())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps) (Logoff);
