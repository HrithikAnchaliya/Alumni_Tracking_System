import React from 'react';
import UserInfo from './UserInfo';
import { connect } from 'react-redux' 

class UserProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all : '',
            loading : true
        }
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/profile', values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({
            all : json,
            loading : false    
        })
        }
        catch(error){
            console.log(error)
        }
    }


    render(){
        return(
            <div>
                { this.state.loading || !this.state.all ?
                (
                    <h5>Loading ..</h5>
                ) : (
                    <div>
                        <UserInfo
                        json={this.state.all}/> 
                    </div>
                ) }

            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (UserProfile);