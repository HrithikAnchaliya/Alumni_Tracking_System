import React from 'react';
import { connect } from 'react-redux';
import { base_url } from './../../Endpoint/endpoint';
import { notifyError_with_msg } from  '../Utils/Message'
import Scrollbar from 'react-scrollbars-custom'
import Spinner from 'react-bootstrap/Spinner';
import 'bulma/css/bulma.css';
import '../Style/toStyleNotice.css'


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
                    notices: json, isLoading: false });
                console.log(json);
            };

        } catch (error) {
            console.log(error);
            this.setState( {error : true} );
            notifyError_with_msg('Unsuccessful To Fetch');
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
                            <Scrollbar style={{ marginLeft: 40, width: 450, height: 450 }}>
                                {
                                    this.state.notices.map((notice) => {
                                        return (    
                                            <div id ='notice-artice' class="card">
                                                <header id ='notice-header' class="card-header">
                                                    <p class="subtitle" >
                                                    {notice.title} 
                                                    </p>
                                                </header>
                                                <div class="card-content">
                                                    <div class="content">
                                                    {notice.subTitle}
                                                        <br/>
                                                        <p class="card-header-title" > Posted By: {notice.postedBy.collegeName || notice.postedBy.adminName} - {notice.onModel} </p>
                                                    </div>
                                                </div>
                                            </div>
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


