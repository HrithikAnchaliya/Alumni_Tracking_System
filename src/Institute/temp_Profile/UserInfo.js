import React from 'react';
import 'bulma/css/bulma.css';
import { Link }from 'react-router-dom'
import '../Style/toStyleProfile.css'

export default class UserInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props.json.education)
        return(
                <div>
                    <Link style={{"textDecoration":'none'}} className="card-footer-item" to='/edit'>Edit</Link>
                    <div id='profile-first-div'>
                    <span>
                    <h5>Profile</h5>
                    {(this.props.json.verified) ? (
                        <h6>Verified</h6>) : ( <h6>Not - Verified</h6>)}
                    </span>
                    </div>
                    <br/>
                    <div id='profile-sec-div'>
                    <p id='basic-id-profile'>
                    <strong id='basic-strong-id'>Basic</strong><hr/>
                    </p>
                    <p id='basic-profile-p'>
                    <strong>Name</strong><br/>
                    </p>
                    <p id='profile-span'>
                    <span >{this.props.json.firstName}</span>
                    </p>
                    <p  id='basic-profile-p'>
                    <strong>Degree</strong><br/>
                    </p>
                    <p id='profile-span'>
                    <span>{this.props.json.degree}</span>
                    </p>
                    <p  id='basic-profile-p'>
                    <strong>Branch</strong><br/>
                    </p>
                    <p id='profile-span'>
                    <span>{this.props.json.branch}</span>
                    </p>
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
               
        )
    }
}

 