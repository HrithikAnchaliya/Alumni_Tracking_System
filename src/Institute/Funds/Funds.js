import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import Fundscard from './FundsCard';
import { notifyError_with_msg } from '../Utils/Message'
import '../Style/toStyleFund.css'

class Funds extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            funds : '',
            loading : true,
            error : false
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
        const data = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(data.err);
        }
        if(response.ok){
        console.log(data)
        this.setState({ funds : data, loading : false })
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg('Unable to fetch');
        }
    }

    render(){
        return(
            <div>
                { this.state.loading || !this.state.funds ?
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : (
                    <div id="funds-page-div">{this.state.funds.map((item,index) => 
                    <Fundscard
                    key={index}
                    title={item.title}
                    subtitle={item.subtitle}
                    Raised={item.totalRaised}
                    id={item._id}/>
                    )}</div>
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


export default connect(mapStatesToProps,null) (Funds);