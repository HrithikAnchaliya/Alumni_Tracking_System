import React from 'react';
import { base_url } from '../../Endpoint/endpoint'
import NewsletterCard from './newletterCard'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
// import '../jobs/Style/toStyle.css'

class Newsletters extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all: null,
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
        const response = await fetch(`${base_url}/${this.props.user}/newsletters`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({all:json, loading:false})
        }
        catch(error){
            console.log(error)
        }
    }


    render(){
        console.log(this.props.user)
        return(
            <div>
                 <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {!this.state.loading ? 
                (
                    <div>{this.state.all.map((item,number) => < NewsletterCard key={number} id={item._id} name={item.name} />)}</div>
                    
                ) : (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>
                )

                }
                </div>
                </div>
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


export default connect(mapStatesToProps,null) (Newsletters);