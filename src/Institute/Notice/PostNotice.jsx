import React from 'react';
import { connect } from 'react-redux';
import { base_url } from './../../Endpoint/endpoint';
import { notifyError_with_msg, notify_Success } from  '../Utils/Message'
import Calendar from 'react-calendar';


class PostNotice extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            subTitle: '',
            expireAt: new Date(),
            submitButtonClass: "button is-dark"          
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onChangeDate = (date) => this.setState({expireAt: date});
 
    async onSubmit() {
        console.log(this.state);

        if (!this.state.title || !this.state.subTitle){
            return notifyError_with_msg(`Title / subtitle can't be blank.`);
        }

        if (new Date() > this.state.expireAt){
            return notifyError_with_msg(`Cant upload notice with an older expiry date.`);
        }

        this.setState({
            submitButtonClass: "button is-dark is-loading"
        });

        const payLoad = {
            title: this.state.title,
            subTitle: this.state.subTitle,
            expireAt: this.state.expireAt
        };

        const options = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(payLoad)
        }

        try{
            const response = await fetch(`${base_url}/${this.props.user}/notices`, options);
            const json = await response.json();

            if (!response.ok) {
                notifyError_with_msg(json._message);
            } else {
                // Response is OK - SUCCESS
                notify_Success();
            }

        } catch(error){
            console.log(error);
            notifyError_with_msg("Unsuccessful to Submit");
        }

        this.setState({
            title: '',
            subTitle: '',
            expireAt: new Date(),
            submitButtonClass: "button is-dark"
        });

    }


    render(){
        const { title, subTitle, expireAt, submitButtonClass } = this.state;

        return (
            <div> 
            <div className="container is-fluid">
            <div id = 'addevent-div-id' className="notification">
                <div class='box'>
                <div class="field">
                    <label class="label">Title</label>

                    <div class="control">
                        <input 
                            class = "input" 
                            type = "text" 
                            placeholder = "e.g. Alumni directory"
                            name = "title"
                            value = { title } 
                            onChange = { this.onChange }
                        />
                    </div>
                </div>

                <div class="field">
                    <label class="label">Message</label>

                    <div class="control">
                        <input 
                            class = "input" 
                            type = "email" 
                            placeholder = "e.g. All alumni are requested to update their profile."
                            name = "subTitle"
                            value = { subTitle }
                            onChange = { this.onChange }
                        />
                    </div>
                </div>

                <div>
                    <label>
                        Select the date when the notice should Auto-Delete.
                    </label>       
                    <br/>
                    <br/>
                    <Calendar
                        name = "expireAt"
                        value = { expireAt }
                        onChange = { this.onChangeDate }
                    />
                </div> 

                <button class = { submitButtonClass } onClick = { this.onSubmit } >
                    Submit
                </button>

                </div>
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
};


export default connect(mapStatesToProps,null)(PostNotice);