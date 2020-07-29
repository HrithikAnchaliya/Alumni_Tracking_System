import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notify_Success_msg, notifyError_with_msg } from  '../Utils/Message'



class FundsPageInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            amount : '',
            amountField : false       
        }
    }

    showInput = () => {
        this.setState({ amountField : true})
    }

    setAmount = (e) => {
        this.setState({amount : e.target.value})
    }
    
    paymentIntent = async () => {
        let amount = {amount : this.state.amount};
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(amount)
        }
        console.log(values)
        try{
            const response = await fetch(`${base_url}/${this.props.user}/funds/${this.props.fund._id}`,values)
            const json = await response.json()
            console.log(json)
            if(!response.ok){
                notifyError_with_msg(json.err);
            }
            if(response.ok){
                notify_Success_msg("Successfully Paid");
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unable To Complete Payment');
        }
    }

    render(){
        let { title, subtitle, description, totalRaised, totalRequired} = this.props.fund
        console.log(totalRaised)
        return(
            <div>
                <hr/>
                <span>
                <h5>{title}</h5>
                <span>{subtitle}</span>
                </span>
                <hr/>
                <br/>
                <span>
                <h5>Description </h5><span>{description}</span>
                </span>
                <hr/>
                <span>
                    <h5>Progress</h5>
                    <br/>
                    <ProgressBar animated now={totalRaised} max={totalRequired}/>
                </span>
                <hr/>
                <br/>
                <span>
                    <button onClick = {this.showInput}>Raise Fund</button>
                </span>
                {   (this.state.amountField) ? (
                    <div>
                        <input name ='amount' value={this.state.amount} onChange={this.setAmount}></input><br/>
                        <button type='button' onClick={this.paymentIntent}>Pay!</button>
                    </div>
                ) : (null)

                }
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


export default connect(mapStatesToProps,null) (FundsPageInfo);