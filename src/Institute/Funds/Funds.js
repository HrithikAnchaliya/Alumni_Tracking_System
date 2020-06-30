import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import Fundscard from './FundsCard';


class Funds extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            funds : '',
            loading : true
        }
    }

    componentDidMount = async () => {
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/funds`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const data = await response.json();
        console.log(data)
        this.setState({ funds : data, loading : false })
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        return(
            <div>
                <div className="container is-fluid">
                <div className="notification">
                { this.state.loading || !this.state.funds ?
                (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>
                ) : (
                    <div id="Jobcard-id">{this.state.funds.map((item,index) => 
                    <Fundscard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    Raised={item.totalRaised}
                    id={item._id}/>
                    )}</div>
                ) }
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


export default connect(mapStatesToProps,null) (Funds);