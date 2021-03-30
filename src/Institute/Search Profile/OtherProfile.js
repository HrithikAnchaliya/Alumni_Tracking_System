import React from 'react';
import OtherProfileInfo from './OtherProfileInfo'
import Spinner from 'react-bootstrap/Spinner'
import { connect } from 'react-redux' 

class OtherProfile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all : '',
            loading : true
        }
    }

    async componentDidMount(){
        let ProfileId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`https://alumni-backend-app.herokuapp.com/${this.props.user}/alumni/${ProfileId}`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
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
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>
                ) : (
                    <div>
                        <OtherProfileInfo
                        json={this.state.all}/> 
                    </div>
                ) }

            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user : state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (OtherProfile);