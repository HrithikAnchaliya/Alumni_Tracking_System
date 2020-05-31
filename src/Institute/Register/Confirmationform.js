import React from 'react';
import { combine } from './Utills/data'


export default class Confirmationform extends React.Component{
    constructor (props) {
        super(props)
        this.toFetch = this.toFetch.bind(this)
      }


    toGoBack = () => {
        this.props.goBack();
    }


    async toFetch() {
        let combined = combine(this.props.values);
        console.log(combined);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(combined)
        }
        console.log(values)
        try{
            const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/register',values)
            const json = await response.json()
            console.log(json)
        }
        catch(error){
            console.log(error)
        }
    }



    render(){
        console.log(this.props.values)


        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                <div>
                    <h5>Are you sure u wanna register</h5>
                    <p>You can go back and check again if the information given is right</p>
                </div>
                <br/>
                <div>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toFetch}type='button'>Submit</button>
                </div>
                </div>
                </div>
            </div>
        )
    }
}