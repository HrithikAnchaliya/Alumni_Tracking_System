import React from 'react';
import Jobinfo from './Jobinfo'
import './Style/toStyle.css'

export default class Addjobs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            company :'',
            workTitle : '',
            industry : '',
            typeOfJob : '',
            salaryOffered : '',
            experience : '',
            country : '',
            state : '',
            city : '',
            description : '',
            skillsRequired : '',
            qualification : '',
            contactInfo : '',
            skills_array : '',
            qualif_array : ''

          }
        
          this.onChange = this.onChange.bind(this);
          this.toArraySkills = this.toArraySkills.bind(this);
          this.toArrayQualif = this.toArrayQualif.bind(this);
    }


    toArraySkills = () => {
        if(this.state.skillsRequired){
        const listToArray = this.state.skillsRequired.split(',');
        console.log(listToArray)
        this.setState({
            skills_array : listToArray
        })}
    }

    toArrayQualif = () => {
        if(this.state.qualification){
        const listToArray = this.state.qualification.split(',');
        console.log(listToArray)
        this.setState({
            qualif_array : listToArray
        })}
    }

    onChange(event){
        if(event.target.name === 'experience'){
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
        
        const { company, workTitle, industry, typeOfJob,salaryOffered,
            experience,country,state ,city ,description ,skillsRequired ,qualification ,contactInfo,skills_array, qualif_array } =  this.state
        
        const values = { company, workTitle, industry, typeOfJob,salaryOffered,
            experience,country,state ,city ,description ,skillsRequired ,qualification ,contactInfo,skills_array, qualif_array  }

        return(
            <div className="container is-fluid">
                <div id='addjob-div-id'className="notification">
               <Jobinfo
               values={values}
               theonChange={this.onChange}
               toArrayskill={this.toArraySkills}
               toArrayQualif={this.toArrayQualif}/>
                </div>
            </div>
        );
    }
}
