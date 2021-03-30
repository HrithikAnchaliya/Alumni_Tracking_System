import React from 'react';
import Eventcard from './Eventcard'
import { connect } from 'react-redux'
import { base_url} from '../../Endpoint/endpoint'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from '../Utils/Message'
import '../Style/toStyleEvent.css'


class Events extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all:null,
            loading:true,
            data:null,
            error:false
        }

    this.toArray = this.toArray.bind(this);
    }

    componentDidMount = async () => {
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/events`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({all:json})
        this.toArray()
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg('Unable to Fetch');
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.all.length !== 0)              //If all-state length is 0 then it has nothing.
        {
            const stateall = this.state.all;
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            this.setState({
                data : dataarray,
                loading : false
            })
        }
    }


    render(){
        return(
            <div>
                <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {!this.state.loading ? 
                (
                    <div id='events-page-div'>{this.state.data.map((item,number) => <Eventcard key={number} id={item._id} time={item.time}title={item.title} subtitle={item.subtitle} date={item.date}/>)}</div>
                ) : (
                    (!this.state.error) ? (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>) : (null)
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


export default connect(mapStatesToProps,null) (Events);




