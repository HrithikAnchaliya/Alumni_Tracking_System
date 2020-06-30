import React from 'react';
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import FundsPageInfo from './FundsPageInfo'
import Spinner from 'react-bootstrap/Spinner'


class FundsPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            fund : '',
            loading : true
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
        if (!response.ok) {
            throw new Error(response.status); // 404
          }
        const data = await response.json();
        console.log(data)
        this.setState({ fund : data, loading : false })
        }
        catch(error){
            console.log(error)
        }
    }

    render(){
        let loading = this.state.loading
        return(
            <div>
                <div className="container is-fluid">
                <div className="notification">
                { (!loading) ? (
                    <FundsPageInfo
                    fund={this.state.fund}/>) : (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>
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