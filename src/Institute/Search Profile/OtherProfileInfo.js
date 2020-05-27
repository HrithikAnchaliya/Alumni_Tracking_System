import React from 'react';

export default class OtherProfileInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props.json.education)
        return(
            <div className="container">
                <div className="notification">
                    <span>
                    <hr/>
                    <h5>Profile</h5>
                    {(this.props.json.verified) ? (
                        <h6>Verified</h6>) : ( <h6>Not - Verified</h6>)}
                    <hr/>
                    <br/>
                    </span>
                    <div>
                    <h5>Basic</h5><hr/>
                    <h6>Name  :  {this.props.json.firstName} {this.props.json.lastName}</h6>
                    <h6>College Name :   {this.props.json.collegeName}</h6>
                    <h6>Degree  :    {this.props.json.degree}</h6>
                    <h6>Branch   :  {this.props.json.branch}</h6>
                    <h6>{this.props.json.startYear} -  {this.props.json.endYear}</h6><hr/>
                    </div>
                    <br/>
                    <div>
                    <h5>About</h5><hr/>
                    <h6>Education</h6><br/>
                    {(this.props.json.education.map((value,index) => (
                        <div key={index}>
                        <h6>School :  {value.school}</h6>
                        <h6>Course :  {value.course}</h6>
                        <h6>{value.startYear} -  {value.endYear}</h6>
                        <br/>
                        </div>
                    ) ))}
                    <br/>
                    <span>
                    <h6>Skills</h6>
                    <ul>
                    {this.props.json.skills.map((value,index) => <li key={index}>{value}</li>)}
                    </ul>
                    </span><br/>
                    <h6>Work Experience</h6><br/>
                    {(this.props.json.workExperiences.map((value,index) => (
                        <div key={index}>
                        <h6>company :  {value.company}</h6>
                        <h6>Title : {value.workTitle}</h6>
                        <h6>industry : {value.industry}</h6>
                        <h6>{value.startYear} -  {value.endYear}</h6>
                        <br/>
                        </div>
                    ) ))}
                    <hr/>
                    <br/>
                    </div>
                    <div>
                    <span>
                    <h5>Personal</h5>
                    <hr/>
                    <h6>Mobile :  {this.props.json.mobileNumber}</h6>
                    <h6>Mail :  {this.props.json.email}</h6>
                    <h6>City :  {this.props.json.location.city}</h6>
                    <hr/>
                    </span>
                    </div>
                    
                </div>
                </div>
        )
    }
}