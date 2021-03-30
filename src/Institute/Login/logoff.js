import React from 'react';
import { connect } from 'react-redux'
import Auth_True from '../../Redux/action/actions'
import Remove_token from '../../Redux/action/removetoken'
import { Redirect } from 'react-router-dom';
import { Deserialize } from './Utils/data';
import { base_url} from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import Button from 'react-bootstrap/Button'

class Logoff extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            redirect : false,
            loading : false
        }
        
        this.officiallogoff = this.officiallogoff.bind(this);
        this.toRedirect = this.toRedirect.bind(this);
    }

    async officiallogoff(){
        this.setState({ loading : true })
        const values = {
            method : "delete",
            headers : {
                'x-auth' : this.props.token
            }
        }
        try{
        let response = await fetch(`${base_url}/${this.props.user}/logout`,values)
        if(!response.ok){
            this.setState({ loading : false})
            notifyError_with_msg("logout unsuccessful");
        }
        if(response.ok){
        Deserialize();
        await this.props.removetoken();
        this.toRedirect();
        }}
        catch(error){
            console.log(error)
            this.setState({ loading : false})
            notifyError_with_msg("logout unsuccessful");
        }
    }

    componentWillUnmount = () => {
        console.log("Logout")
    }

    toRedirect = () => {
        if(!this.props.Auth){
            this.setState({
                redirect : true
            })
        }
    }

    
    render(){
        let loading = this.state.loading
        return(
            <div>
                <br/>
                <br/>
                <div className="container">
                    <div id='addevent-div-id' className="notification">
                    <br/>
                        <label>Are You Sure You Want To Logout</label>

                        <br/>
                        <br/>
                        <Button variant="outline-dark" disabled={loading} onClick={this.officiallogoff} type='button'>Log Out</Button>

                        {/* <button disabled={loading} onClick={this.officiallogoff} type='button'>Log Out</button> */}
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
        Auth : state.Auth_state,
        user : state.Auth_user,
        token : state.Auth_token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        change_state_true : () => dispatch(Auth_True()),
        removetoken : () => dispatch(Remove_token())
    }
}

export default connect(mapStatesToProps,mapDispatchToProps) (Logoff);
