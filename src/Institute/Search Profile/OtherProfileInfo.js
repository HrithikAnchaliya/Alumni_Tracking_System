import React from 'react';
import { Link }from 'react-router-dom'
import { connect } from 'react-redux'

class OtherProfileInfo extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        console.log(this.props.json.education)
        return(
                <div>
                    <div className="container is-fluid">
                    <div id = 'profile-div-id' className="notification">

                    {this.props.user === 'college' ? (
                    <Link className='button'  to={{
                        pathname : `/profile/${this.props.json._id}/contact`,
                        aboutProps : {
                            profile_id : this.props.json._id
                        }
                    }}>Get In Touch</Link>) : (null)}

                    <div className='box'>
                    <span id='basic-id-profile'>
                    <h5 id='just-font'>Profile</h5>
                    {(this.props.json.verified) ? (
                        <h6>Verified</h6>) : ( <h6>Not - Verified</h6>)}
                    </span>
                    </div>
                        
                    <label>Basic</label><br/>

                    <div className='box'>
                    <p >
                    <strong id='basic-profile-p'>Name</strong><br/>
                    </p>
                    <p >
                    <span id='basic-strong-id' >{this.props.json.firstName}</span>
                    </p>
                    <p >
                    <strong id='basic-profile-p'>Degree</strong><br/>
                    </p>
                    <p>
                    <span id='basic-strong-id'>{this.props.json.degree}</span>
                    </p>
                    <p >
                    <strong id='basic-profile-p'>Branch</strong><br/>
                    </p>
                    <p>
                    <span id='basic-strong-id'>{this.props.json.branch}</span>
                    </p>
                    </div>
                        
                    <label>About</label><br/>

                    <div className="columns">
                        <div className="column">
                            <div className='box'>
                            <h6  id='basic-profile-header'>Education</h6><br/>
                            {(this.props.json.education.map((value,index) => (
                                <div key={index}>
                                <label>School :</label>  <span>{value.school}</span><br/>
                                <label>Course :</label>  <span>{value.course}</span><br/>
                                <label>{value.startYear} -  {value.endYear}</label>
                                <br/>
                                <br/>
                                </div>
                            ) ))}
                            </div>
                        </div>
                        <div className="column">
                            <div className='box'>
                                <span>
                                <h6 id='basic-profile-header'>Skills</h6>
                                <ul>
                                {this.props.json.skills.map((value,index) => <li key={index}><label>{value}</label></li>)}
                                </ul>
                                </span><br/>
                            </div>
                        </div>
                    </div>
                    
                    <div className='box'>

                    <h6 id='basic-profile-header'>Work Experience</h6><br/>
                    <div className="columns">
                    {(this.props.json.workExperiences.map((value,index) => (
                        <div  key={index} className="column">
                            <div>
                                <label>company : </label> <span>{value.company}</span><br/>
                                <label>Title : </label> <span>{value.workTitle}</span><br/>
                                <label>industry : </label> <span>{value.industry}</span><br/>
                                <label>{value.startYear} -  {value.endYear}</label>
                                <br/>
                            </div>
                        </div>
                         ) ))}
                    </div>

                    </div>

                    <label>Personal</label>

                    <div className='box'>
                    <span>
                    <label>Mobile : </label> {this.props.json.mobileNumber}<br/>
                    <label>Mail :</label>  {this.props.json.email}<br/>
                    <label>City :</label>  {this.props.json.location.city}<br/>
                    </span>
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
}


export default connect(mapStatesToProps,null) (OtherProfileInfo);