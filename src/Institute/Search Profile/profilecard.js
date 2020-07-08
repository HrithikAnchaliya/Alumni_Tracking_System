import React from 'react';
import 'bulma/css/bulma.css'
import { Link } from "react-router-dom";

export default class Profilecard extends React.Component{
    render(){
        let { id, name, last, email, branch, degree, skills, location, socialProfiles } = this.props
        console.log(location)
        return(
            <div style={{width:'290px' , height:'600px'}}>
                <div className="card">
                    {/* <div className="card-image">
                        <figure className="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"></img>
                        </figure>
                    </div> */}
                    <div className="card-content">
                        <div className="media">
                        <div className="media-left">
                            <figure className="image is-48x48">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"></img>
                            </figure>
                        </div>
                        <div className="media-content">
                            <p className="title is-4">{name} {last}</p>
                            <p className="subtitle is-6">{email}</p>
                        </div>
                        </div>
                        <div className="content">
                        <p className="subtitle is-6"><b>Branch</b> : {branch}</p>
                        <p className="subtitle is-6"><b>Degree</b> : {degree}</p>
                        {/* {(location !== null) ? (
                        <p className="subtitle is-6"><b>City</b> : {location.city}</p>) : (null)
                        } */}
                        {(skills.length !== 0) ? ( // Should be Skills.lenght
                        skills.map((item,index) => <a key={index} href="void"> #{item} </a>)) : (null)}
                        <br/>{(socialProfiles.length !== 0) ? 
                        (<div><a href={socialProfiles.facebook}> Facebook </a> <a href={socialProfiles.linkedin}> Linkedin </a> </div>) 
                        : (null)}
                        </div>
                    </div>
                    <footer style={{width:'290px',height:'50px'}} className="card-footer">
                    <Link style={{"textDecoration":'none'}} className="card-footer-item" to={`/profile/${id}`}>Link</Link>
        
                </footer>
                </div>
            </div>
        );
    }
}

