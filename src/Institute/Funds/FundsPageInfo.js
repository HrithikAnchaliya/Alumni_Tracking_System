import React from 'react';
import { connect } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import { notify_Success_msg, notifyError_with_msg } from  '../Utils/Message'
import Button from 'react-bootstrap/Button'


class FundsPageInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            amount : '',
            amountField : false       
        }
    }

    showInput = () => {
        this.setState({ amountField : !this.state.amountField})
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
                <h5 id='font-size-larger'>{title}</h5>
                <span id='fontspan-size-larger'>{subtitle}</span>
                </span>
                <hr/>
                <br/>
                <span>
                <h5 id='font-size-larger'>Description </h5><span id='fontspan-size-larger'>{description}</span>
                </span>
                <hr/>
                <span>
                    <h5 id='font-size-larger'>Progress</h5>
                    <br/>
                    <progress class="progress is-primary" value={totalRaised} max={totalRequired}>{totalRaised}%</progress>
                </span>
                <hr/>
                <br/>
                <span>
                    <Button variant="outline-dark" onClick = {this.showInput} type='button'>Raise Fund</Button>
                </span>
                <br/>
                <br/>
                {   (this.state.amountField) ? (
                    <div>
                        <input id='job-search' name ='amount' value={this.state.amount} onChange={this.setAmount}></input><br/>
                            <br/>
                        <Button variant="outline-dark" onClick={this.paymentIntent} type='button'>Pay</Button>

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