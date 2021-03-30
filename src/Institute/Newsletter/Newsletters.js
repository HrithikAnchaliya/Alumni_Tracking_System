import React from 'react';
import { base_url } from '../../Endpoint/endpoint'
import NewsletterCard from './newletterCard'
import { connect } from 'react-redux'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from '../Utils/Message'
import '../Style/toStyleNewsletter.css'


class Newsletters extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all: null,
            loading : true,
            error : false
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
        const json = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({all:json, loading:false})
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg("Unable to fetch");
        }
    }


    render(){
        console.log(this.props.user)
        return(
            <div>
                 <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {!this.state.loading ? 
                ((this.state.all.length !== 0) ? (
                    <div id='news-page-div'>{this.state.all.map((item,number) => < NewsletterCard key={number} id={item._id} name={item.name} />)}</div>) 
                    : (null)
                ) : (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null))
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