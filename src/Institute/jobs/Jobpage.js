import React from 'react';
import { connect } from 'react-redux'
import JobPageInfo from './Jobpageinfo'
import {  base_url } from '../../Endpoint/endpoint'

class Jobpage extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                job : '',
                loading : '',
                arrayed_job : ''
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
        console.log(response)
        if (!response.ok) {
            throw new Error(response.statusText); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({
            job : json })
        this.toArray()
        }
        catch(error){
            console.log(error)
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.job)              
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
                (<h6>Loading ..</h6>) : 
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