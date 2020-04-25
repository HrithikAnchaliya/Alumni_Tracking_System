import React from 'react';
import { connect } from 'react-redux'
import 'bulma/css/bulma.css';


class AddInterviewInfo extends React.Component{
    constructor(props){
        super(props)
    
        this.toGather = this.toGather.bind(this);
        this.toPost = this.toPost.bind(this);
        }

    async toGather(){
        await this.props.toArray()                       //function decomposition

        const { company, workTitle, industry , difficulty, description, feedback,"topics": topics_array } = this.props.values

      const aloneValue = {
        company, workTitle, industry , difficulty, description,feedback,topics_array
      }
          console.log(aloneValue)
          this.toPost(aloneValue)
    }

    async toPost(data){
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(data)
        }
        console.log(values)
        try{
            const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/interviews',values)
            const json = await response.json()
            console.log(json)
        }
        catch(error){
            console.log(error)
        }
    }
    
    render(){

        const {  difficulty, description, topics,feedback } = this.props.values
        return(
            <div>
            <form>
                <div id='addjobcontainer' className="container is-fluid">
                <div className="notification">
                <h5>Company</h5>
                    <select  name="company"  onChange={this.props.onChange}>
                        <option value="">Select Company</option>
                        <option value="microsoft">Microsoft</option>
                        <option value="google">Google</option>
                        <option value="hcl">HCL</option>
                        <option value="msi">MSI</option>
                    </select>
                    <br/>
                    <h5>Work - Title</h5>
                    <select  name="workTitle"  onChange={this.props.onChange}>
                        <option value="">select Title</option>
                        <option value="front end dev">Front-End Developer</option>
                        <option value="back end dev">Back-End Developer</option>
                        <option value="software dev">Software Developer</option>
                        <option value="database management">Database Management</option>
                        <option value="software security">Software Security</option>
                    </select>
                    <br/>
                    <h5>Industry</h5>
                    <select  name="industry"  onChange={this.props.onChange}>
                        <option value="">select Industry</option>
                        <option value="IT">IT</option>
                        <option value="automobile">Automobile</option>
                        <option value="bio tech">Bio - Tech</option>
                        <option value="Film">Film</option>
                    </select>
                    <br/>
                    <h5>Difficulty</h5> 
                        <input name='difficulty' type='number' placeholder='Range is from 1 to 5' onChange={this.props.onChange} value={difficulty}></input>
                    <br/>
                    <h5>Description</h5>
                    <textarea name="description"  value={description} onChange={this.props.onChange} ></textarea>
                    <br/>
                    <h5>Topics</h5>
                    <textarea name="topics"  value={topics} onChange={this.props.onChange} ></textarea>
                    <br/>
                    <h5>Feedback</h5>
                    <textarea name="feedback"  value={feedback} onChange={this.props.onChange} ></textarea>
                    <br/>
                    <button type='button' onClick={this.toGather}>Submit</button>
                </div>
                </div>
            </form>
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (AddInterviewInfo);