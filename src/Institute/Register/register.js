import React from 'react';            // This Module Needs to be optimised .. 
import Basicform from './Basicform'     // It Really is not so good ..
import Workform from './Workform'
import Standardform from './Standardform'
import Confirmationform from './Confirmationform'
import { base_url} from '../../Endpoint/endpoint'


export default class Register extends React.Component{     
    constructor(props){
        super(props)
        this.state = {
            firstName : '',
            lastName : '',
            user:'',
            country : '',
            state : '',
            city : '',
            collegeId : '',
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
            education_input : [],
            work_input : [],
            College_Names_fetch : '',
            page : 1
        }
        
          this.onChangefuc = this.onChangefuc.bind(this);
          this.goNext = this.goNext.bind(this);
          this.goBack = this.goBack.bind(this);
          this.toNumber = this.toNumber.bind(this);
          this.Addfield = this.Addfield.bind(this);
          this.Deletefield = this.Deletefield.bind(this);
          this.AddWorkField = this.AddWorkField.bind(this);
          this.DeleteWorkField = this.DeleteWorkField.bind(this);

    }

    componentDidMount = async () => {
        const values = {
            method : "GET"
        }
        try{
        const response = await fetch(`${base_url}/college`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
        }
        if(response.ok){
        const json = await response.json();
        console.log(json)
        this.setState({College_Names_fetch : json})
        }}
        catch(error){
            console.log(error)
        }
    }


    toNumber = (e) => {
        this.setState({
            [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
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

    Addfield = () => { 
        const field = this.state.education_input;
        const size = field.length + 1;
        field.push(size)
        this.setState({
            education_input : field
        })
    }

    Deletefield = () => {
        const field = this.state.education_input;
        field.pop()
        this.setState({
            education_input : field
        })
    }

    AddWorkField = () => { 
        const field = this.state.work_input;
        const size = field.length + 1;
        field.push(size)
        this.setState({
            work_input : field
        })
    }

    DeleteWorkField = () => {
        const field = this.state.work_input;
        field.pop()
        this.setState({
            work_input : field
        })
    }
    

    render(){
        console.log(this.state)

        const {  page, firstName, lastName, user, country, state, city, collegeId, startYear, endYear,  
            degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
            email, password, mobileNumber, facebook, linkedin, skills , skills_array, education_input, College_Names_fetch } = this.state

        const values = {  firstName, lastName, user, country, state, city, collegeId, startYear, endYear,  
            degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
            email, password, mobileNumber, facebook, linkedin, skills, skills_array, page, education_input, College_Names_fetch }



        switch(page){
            case 1:
                return <Basicform
                values={values}
                handlechg={this.onChangefuc}    
                number={this.toNumber}
                goNext={this.goNext}/>
            case 2:
                return <Workform
                field={this.state}
                handlechg={this.onChangefuc}
                goNext={this.goNext}
                goBack={this.goBack}
                Addfield={this.Addfield}
                Deletefield={this.Deletefield}
                AddWorkField={this.AddWorkField}
                DeleteWorkField={this.DeleteWorkField}/>
            case 3:
                return <Standardform
                values={values}
                handlechg={this.onChangefuc}
                number={this.toNumber}
                goNext={this.goNext}
                goBack={this.goBack}/>
            case 4:
                return <Confirmationform
                values={this.state}
                goBack={this.goBack}/>
            default:
                return <h6>What up .. (under dev)</h6>
        }
    }
}


