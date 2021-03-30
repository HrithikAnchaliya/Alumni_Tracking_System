import React from 'react';
import AddinterviewInfo from './AddInterviewInfo'
import '../Style/toStyleInterview.css'

export default class Addinterview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            company :'',
            workTitle : '',
            industry : '',
            difficulty : '',
            description : '',
            toTopics : '',
            feedback : '',
            topics_array : ''
          }
          
          this.onChange = this.onChange.bind(this);
    }

    onChange(event){
        if(event.target.name === 'difficulty'){
            this.setState({
                [event.target.name]: event.target.type === 'number' ? parseInt(event.target.value) : event.target.value
            });
        }
        else{
        this.setState({
            [event.target.name] : event.target.value
        });
    }}


    render(){
        const { company, workTitle, industry , difficulty, description, toTopics,feedback,topics_array } = this.state
        const values = { company, workTitle, industry , difficulty, description, toTopics,feedback,topics_array }
        return(
            <div className="container is-fluid">
                <div id = 'interview-div-id' className="notification">
                <AddinterviewInfo
                onChange={this.onChange}
                values={values}/>
                </div>
            </div>
        )
    }
}