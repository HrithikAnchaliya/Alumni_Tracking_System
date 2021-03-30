import React from 'react';
import { connect } from 'react-redux';
import {  base_url } from '../../Endpoint/endpoint'
import InterviewPageInfo from './InterviewPageInfo'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from  '../Utils/Message'
import '../Style/toStyleInterview.css'


class InterviewPage extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                interivew : '',
                loading : '',
                arrayed_interview : '',
                error : false
            }
        this.toArray = this.toArray.bind(this);
    }

    async componentDidMount(){
        let InterviewId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/interviews/${InterviewId}`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(json._message);
        }
        if(response.ok){
        console.log(json)
        this.setState({ interivew : json })
        this.toArray()
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('unable to fetch');
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.interivew.length !== 0)              
        {
            const stateall = this.state.interivew;
            console.log(stateall)
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray)
            this.setState({
                arrayed_interview: dataarray,
                loading : false
            })
        }
    }

    render(){
        console.log(this.props.computedMatch.params.id)
        return(
            <div>
                {this.state.loading || !this.state.arrayed_interview ? 
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : 
                (
                    <div id='interview-div'>
                        <InterviewPageInfo
                        title={this.state.interivew.workTitle}
                        industry={this.state.interivew.industry}
                        difficulty={this.state.interivew.difficulty}
                        description={this.state.interivew.description}
                        feedback={this.state.interivew.feedback}
                        company={this.state.interivew.company}
                        topics={this.state.arrayed_interview[0]}/>
                    </div>
                )}
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


export default connect(mapStatesToProps,null) (InterviewPage);