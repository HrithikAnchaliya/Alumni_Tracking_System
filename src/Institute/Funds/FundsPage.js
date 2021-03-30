import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import FundsPageInfo from './FundsPageInfo'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from  '../Utils/Message'


class FundsPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fund : '',
            loading : true,
            error : false
        }
    }

    componentDidMount = async () => {
        let FundId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/funds/${FundId}`, values);
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(data._message);
        }
        if(response.ok){
        console.log(data)
        this.setState({ fund : data, loading : false })
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('Unsuccessful to fetch');
        }
    }

    render(){
        let loading = this.state.loading
        return(
            <div>
                <div className="container is-fluid">
                <div id='fundpage-div' className="notification">
                { (!loading) ? (
                    <FundsPageInfo
                    fund={this.state.fund}/>) : 
                    (
                        (!this.state.error) ? (
                            <div id='Loading-id'>
                            <Spinner  animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                            </Spinner>
                            </div>) : (null)
                    )}
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


export default connect(mapStatesToProps,null) (FundsPage);