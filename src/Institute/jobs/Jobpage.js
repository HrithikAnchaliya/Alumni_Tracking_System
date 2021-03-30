import React from 'react';
import { connect } from 'react-redux'
import JobPageInfo from './Jobpageinfo'
import Spinner from 'react-bootstrap/Spinner'
import {  base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from  '../Utils/Message'


class Jobpage extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                job : '',
                loading : true,
                arrayed_job : '',
                error : false
            }
        this.toArray = this.toArray.bind(this);
    }

    async componentDidMount(){
        let jobId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`${base_url}/${this.props.user}/jobs/${jobId}`, values);
        const json = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(json._message);
        }
        if(response.ok){
        console.log(json)
        this.setState({ job : json })
        this.toArray()
        }}
        catch(error){
            console.log(error);
            this.setState( {error : true} );
            notifyError_with_msg('Unsuccessful to fetch')
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.job.length !== 0)              
        {
            const stateall = this.state.job;
            console.log(stateall)
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray)
            this.setState({
                arrayed_job : dataarray,
                loading : false
            })
        }
    }

    render(){
        console.log(this.props.computedMatch.params.id)
        return(
            <div>
                {this.state.loading || !this.state.arrayed_job ? 
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : 
                (
                    <div>
                        <JobPageInfo
                        company={this.state.job.company}
                        title={this.state.job.workTitle}
                        industry={this.state.job.industry}
                        type={this.state.job.typeOfJob}
                        description={this.state.job.description}
                        experience={this.state.job.experience}
                        salary={this.state.job.salaryOffered}
                        city={this.state.job.location.city}
                        link={this.state.job.contactInfo}
                        skills={this.state.arrayed_job[1]}
                        qualification={this.state.arrayed_job[2]}/>
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


export default connect(mapStatesToProps,null) (Jobpage);