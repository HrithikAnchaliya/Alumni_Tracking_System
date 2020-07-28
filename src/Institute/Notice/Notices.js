import React from 'react';
import { connect } from 'react-redux';
import { base_url } from './../../Endpoint/endpoint';
import { notifyError_with_msg } from  '../Utils/Message'
import Scrollbar from 'react-scrollbars-custom'

import Spinner from 'react-bootstrap/Spinner';
import 'bulma/css/bulma.css';


class NoticeComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLoading: false,
            notices: [],
            error: false
        }
    }

    async componentDidMount(){

        this.setState({ isLoading: true });

        const options = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        };

        try {
            const response = await fetch(`${base_url}/${this.props.user}/notices`, options);
            const json = await response.json();
            if (!response.ok) {
                this.setState( {error : true} );
                return notifyError_with_msg(json.err);
            } else {
                // If response is OK - True
                this.setState({
                    isLoading: false,
                    notices: json
                });
                console.log(json);
            };

        } catch (error) {
            console.log(error);
            this.setState( {error : true} );
            notifyError_with_msg('Unsuccessful to fetch');
        }
    }

    render(){
        return (
            <div>
                {
                    this.state.isLoading ? 
                        (
                            <div id='Loading-id'>
                                <Spinner animation="border" role="status">
                                    <span className="sr-only">Loading...</span>
                                </Spinner>
                            </div>
                        ) 
                    : 
                        (
                            <Scrollbar style={{ width: 750, height: 450 }}>
                                {
                                    this.state.notices.map((notice) => {
                                        return (
                                            <article className="message is-dark">
                                                <div className="message-header">
                                                    <p> 
                                                        {notice.title} 
                                                    </p>  
                                                </div>

                                                <div className="message-body">
                                                    {notice.subTitle}
                                                </div>
                                            
                                                <div> 
                                                    <strong>
                                                        Posted By: {notice.postedBy.collegeName || notice.postedBy.adminName} - {notice.onModel}
                                                    </strong>
                                                </div>

                                            </article>
                                        )
                                    })
                                }
                            </Scrollbar>
                        )
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
};

export default connect(mapStatesToProps,null) (NoticeComponent);