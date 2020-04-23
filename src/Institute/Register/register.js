import React from 'react';
import Basicform from './Basicform'
import Workform from './Workform'
import Standardform from './Standardform'
import Confirmationform from './Confirmationform'


export default class Register extends React.Component{     
    constructor(props){
        super(props)
        this.state = {
            firstName : '',
            lastName : '',
            country : '',
            state : '',
            city : '',
            collegeName : '',
            startYear : '',
            endYear : '',
            degree : '',
            branch : '',
            rollNumber  : '',
            school : '',
            course : '',
            eduStartYear : '',
            eduEndYear : '',
            workTitle : '',
            company : '',
            industry : '',
            workStartYear : '',
            workEndYear : '',
            email : '',
            password : '',
            mobileNumber : '',
            facebook : '',
            linkedin : '',
            skills : '',
            skills_array : '',
            page : 1
        }
        
          this.onChangefuc = this.onChangefuc.bind(this);
          this.goNext = this.goNext.bind(this);
          this.goBack = this.goBack.bind(this);
          this.toArray = this.toArray.bind(this);
          this.toNumber = this.toNumber.bind(this);
          
    }


    toNumber = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
        })
    }

    toArray = () => {
        const listToArray = this.state.skills.split(',');
        console.log(listToArray)
        this.setState({
            skills_array : listToArray
        })
    }

    onChangefuc(event){
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    goNext = () => {
        const { page } = this.state
        this.setState({
            page : page + 1
        })
    }

    goBack = () => {
        const { page } = this.state
        this.setState({
            page : page - 1
        })
    }
    

    render(){
        console.log(this.state)

        const {  page, firstName, lastName, country, state, city, collegeName, startYear, endYear,  
            degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
            email, password, mobileNumber, facebook, linkedin, skills , skills_array } = this.state

        const values = {  firstName, lastName, country, state, city, collegeName, startYear, endYear,  
            degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
            email, password, mobileNumber, facebook, linkedin, skills, skills_array, page }



        switch(page){
            case 1:
                return <Basicform
                values={values}
                handlechg={this.onChangefuc}
                number={this.toNumber}
                goNext={this.goNext}/>
            case 2:
                return <Workform
                values={values}
                handlechg={this.onChangefuc}
                goNext={this.goNext}
                goBack={this.goBack}/>
            case 3:
                return <Standardform
                values={values}
                handlechg={this.onChangefuc}
                number={this.toNumber}
                goNext={this.goNext}
                goBack={this.goBack}/>
            case 4:
                return <Confirmationform
                values={values}
                goBack={this.goBack}
                Arraying={this.toArray}/>
            default:
                return <h6>What up .. (under dev)</h6>
        }
    }
}


