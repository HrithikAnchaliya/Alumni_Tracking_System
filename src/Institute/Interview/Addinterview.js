import React from 'react';
import AddinterviewInfo from './AddInterviewInfo'


export default class Addinterview extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            company :'',
            workTitle : '',
            industry : '',
            difficulty : '',
            description : '',
            topics : '',
            feedback : '',
            topics_array : ''
          }
          
          this.onChange = this.onChange.bind(this);
          this.toArrayTopics = this.toArrayTopics.bind(this);
    }

    toArrayTopics = () => {
        if(this.state.topics){
        const listToArray = this.state.topics.split(',');
        console.log(listToArray)
        this.setState({
            topics_array : listToArray
        })}
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
        const { company, workTitle, industry , difficulty, description, topics,feedback,topics_array } = this.state
        const values = { company, workTitle, industry , difficulty, description, topics,feedback,topics_array }
        return(
            <div>
                <AddinterviewInfo
                toArray={this.toArrayTopics}
                onChange={this.onChange}
                values={values}/>
            </div>
        )
    }
}