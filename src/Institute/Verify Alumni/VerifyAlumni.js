import React from 'react'
import { notifyError_with_msg } from '../Utils/Message'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import toCreateData from './Utils/data'
import DataTable from './DataTable'

class VerifyAlumni extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            alumnies : null,
            loading : true,
            error : false,
            rows : []
        }
        this.toPushData = this.toPushData.bind(this);
    }

    componentDidMount = async () => {
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/alumni?verified=false`, values);
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(data.err);
        }
        if(response.ok){
        console.log(data)
        this.setState({ alumnies : data })
        this.toPushData();
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg('Unable To Fetch');
        }
    }

    toSpliceRow = () => {
        console.log("in splice");
    }

    toPushData = () => {
        let row = []
        if(this.state.alumnies !== null){
            row = toCreateData(this.state.alumnies)
        }
        this.setState({ rows : row, loading : false })
    }

    render(){
        console.log(this.state.alumnies);
        console.log(this.state.rows);
        return(
            <div>
                 <div className="container is-fluid">
                <div id='background-white' className="notification">
                { this.state.loading || !this.state.alumnies ?
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : (
                    <DataTable 
                        rows={this.state.rows}
                        toSPlice={this.toSpliceRow}    
                    />
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


export default connect(mapStatesToProps,null) (VerifyAlumni);