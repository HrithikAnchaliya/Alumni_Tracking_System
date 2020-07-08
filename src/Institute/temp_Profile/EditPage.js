import React from 'react';
import Basicform from './Basicform'
import Workform from './Workform'
import Standardform from './Standardform'
import Confirmationform from './Confirmationform'
import { connect } from 'react-redux'
import update from 'immutability-helper';
import { notifyError_with_msg } from '../Utils/Message'




class EditPage extends React.Component{     
    constructor(props){
        super(props)
        this.state = {
            data : '',
            education : [],
            work : [],
            education_input : [],
            work_input : [],
            page : 1,
            goNext : true
        }
          this.forAddingEdu = this.forAddingEdu.bind(this);
          this.forAddingWork = this.forAddingWork.bind(this);        
          this.onChangefuc = this.onChangefuc.bind(this);
          this.goNext = this.goNext.bind(this);
          this.goBack = this.goBack.bind(this);
          this.toSetData = this.toSetData.bind(this);
          this.Addfield = this.Addfield.bind(this);
          this.Deletefield = this.Deletefield.bind(this);
          this.AddWorkField = this.AddWorkField.bind(this);
          this.DeleteWorkField = this.DeleteWorkField.bind(this);

    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token
            }
        }
        console.log(values)
        try{
            const response = await fetch('https://alumni-backend-app.herokuapp.com/alumni/profile',values)
            const json = await response.json()
            if(!response.ok){
                this.setState({goNext : true})
                notifyError_with_msg(json._message);
            }
            if(response.ok){
            console.log(json)
            this.setState({
                data : json,
                goNext : false
            })
        }}
        catch(error){
            console.log(error)
            this.setState({goNext : true})
            notifyError_with_msg("Can't Load the Page");
        }
    }

    forAddingEdu(data){
        this.setState({
            education : data
        });
    }

    forAddingWork(data){
        this.setState({
            work : data
        });
    }

    toSetData = (data) =>{
        this.setState({
            data : data
        })
    }

    onChangefuc(event){
        const data = this.state.data;
        let value = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
        if(event.target.name === 'city' || event.target.name === 'state' || event.target.name === 'country'){
            const innerArray = update(data, {location: { [event.target.name]: { $set: value }}});
            this.setState({
                data : innerArray
            }); 
            console.log(innerArray);
        }
        else{
        const innerArray = update(data, { [event.target.name]: { $set: value } })
        this.setState({
            data : innerArray
        });
        console.log(innerArray);
        }
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
        const newArray = {};
        const toPush = this.state.education;
        toPush.push(newArray);
        this.setState({
            education_input : field,
            education : toPush
        })
    }

    Deletefield = () => {
        const field = this.state.education_input;
        field.pop()
        const toPop = this.state.education;
        toPop.pop()
        this.setState({
            education_input : field,
            education : toPop
        })
    }

    AddWorkField = () => { 
        const field = this.state.work_input;
        const size = field.length + 1;
        field.push(size)
        const newArray = {};
        const toPush = this.state.work;
        toPush.push(newArray);
        this.setState({
            work_input : field,
            work : toPush
        })
    }

    DeleteWorkField = () => {
        const field = this.state.work_input;
        field.pop()
        const toPop = this.state.work;
        toPop.pop()
        this.setState({
            work_input : field,
            work : toPop
        })
    }
    

    render(){
        let page = this.state.page
        const values = this.state;
        console.log(this.state);
        // return(
        //     <h5>Edit</h5>
        // )
        // const {  firstName, lastName, country, state, city, collegeName, startYear, endYear,  
        //     degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
        //     email, password, mobileNumber, facebook, linkedin, skills , skills_array, education_input } = this.state

        // const values = {  firstName, lastName, country, state, city, collegeName, startYear, endYear,  
        //     degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear,
        //     email, password, mobileNumber, facebook, linkedin, skills, skills_array, page, education_input }



        switch(page){
            case 1:
                return <Basicform
                values={values}
                handlechg={this.onChangefuc}
                goNext={this.goNext}/>
            case 2:
                return <Workform
                field={values}
                handlechg={this.onChangefuc}
                forAddWork={this.forAddingWork}
                forAddEdu={this.forAddingEdu}
                setData={this.toSetData}
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
                setData={this.toSetData}
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

const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (EditPage);
