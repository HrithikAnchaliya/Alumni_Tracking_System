/*eslint-disable no-eval */
import React from 'react';
import update from 'immutability-helper';


export default class Workform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    toGoBack = () => {
        this.props.goBack();
    }

    toAddField = () => {
        this.props.Addfield();
    }

    toDeleteField = () => {
        this.props.Deletefield();
    }

    forEducation = (event) =>{
        let data = this.props.field.data;
        let value = event.target.value;
        const innerArray = update(data, {education: {[event.target.id]: { [event.target.name]: { $set: value }}}});
        this.props.setData(innerArray)
    }

    forWork = (event) =>{
        let data = this.props.field.data;
        let value = event.target.value;
        const innerArray = update(data, {workExperiences: {[event.target.id]: { [event.target.name]: { $set: value }}}});
        this.props.setData(innerArray)
    }

    forAddEdu = (event) =>{
        let State = this.props.field.education;
        let value = event.target.value;
        const innerArray = update(State, {[event.target.id]: { [event.target.name]: { $set: value }}});
        console.log(innerArray)
        this.props.forAddEdu(innerArray)   
    }

    forAddWork = (event) => {
        let State = this.props.field.work;
        let value = event.target.value;
        const innerArray = update(State, {[event.target.id]: { [event.target.name]: { $set: value }}});
        console.log(innerArray)
        this.props.forAddWork(innerArray)
    }

    toDelEdu = (event) => {
        const data = this.props.field.data;
        let innerArray = update(data.education, { $splice : [[event.target.id, 1]]})
        const set = update(data, {education : { $set : innerArray}})
        this.props.setData(set);
    }

    toDelWork = (event) => {
        const data = this.props.field.data;
        let Work = data.workExperiences;
        Work.splice(event.target.id, 1);
        const innerArray = update(data, {workExperiences : { $set : Work}})
        this.props.setData(innerArray);
    }
    
    render(){
        const {  education, workExperiences, degree, branch, rollNumber } = this.props.field.data
        const { work_input, education_input } = this.props.field;
        // eslint-disable-next-line
        const Edu = this.props.field.education;
        // eslint-disable-next-line
        const Work = this.props.field.work;
        return(
                <div>
                    <div className="container is-fluid">
                    <div className="notification">
                    <form>
                    <h6>Degree</h6>
                    <select name="degree" onChange={this.props.handlechg} id='degree'>
                        <option value="">Degree</option>
                        <option value="b.tech">B.Tech</option>
                        <option value="b.e">B.E</option>
                    </select>
                    <br/>
                    <span>Selected Degree : {degree}</span>
                    <br/>
                    <br/>
                    <h6>Branch</h6>
                    <select name="branch" onChange={this.props.handlechg} id='branch'>
                        <option value="">Branch</option>
                        <option value="cse">Computer Science</option>
                        <option value="mech">Mechanical</option>
                        <option value='civil'>Civil</option>
                    </select>
                    <br/>
                    <span>Selected Branch : {branch}</span>
                    <br/>
                    <br/>
                    <h6>Roll Number</h6>
                    <input type='number' onChange={this.props.handlechg} name='rollNumber' defaultValue={rollNumber} step='1'></input>
                    <br/>
                    <br/>
                    <div>
                    <h5>Education</h5>
                        {(education.length !== 0) ? ( 
                            education.map((value, index) => (
                                <div key={value.school}>
                                    <br/>
                                    <span>School/University/College</span>
                                    <input onChange={this.forEducation} id={index} name='school' defaultValue={value.school} type='text'></input>
                                    <span>Course</span>
                                    <input onChange={this.forEducation} id={index} name="course" defaultValue={value.course} type='text'></input>
                                    <span>Start - Year</span>
                                    <input onChange={this.forEducation} id={index} name="startYear" defaultValue={value.startYear} type='text'></input>
                                    <span>End - Year</span>
                                    <input onChange={this.forEducation} id={index} name="endYear" defaultValue={value.endYear} type='text'></input>
                                    <br/>
                                    <button onClick={this.toDelEdu} id={index} type="button">Delete</button>
                                    <br/>
                                    <br/>
                                </div>
                            ))) : (null)
                        }
                        <br/>
                    <div>
                    {(education_input.length !== 0) ? ( 
                            education_input.map((value,index) => (
                                <div key={index}>
                                    <h5>Add Education</h5>
                                    <span>School/University/College</span>
                                    <input onChange={this.forAddEdu} id={index} name="school" defaultValue={eval("Edu[index].school")} type='text'></input>
                                    <span>Course</span>
                                    <input onChange={this.forAddEdu} id={index} name="course"  defaultValue={eval("Edu[index].course")} type='text'></input>
                                    <span>Start - Year</span>
                                    <input onChange={this.forAddEdu} id={index} name="startYear"  defaultValue={eval("Edu[index].startYear")} type='text'></input>
                                    <span>End - Year</span>
                                    <input onChange={this.forAddEdu} id={index} name="endYear" defaultValue={eval("Edu[index].endYear")} type='text'></input>
                                    <br/>
                                    <br/>
                                </div>
                            ))) : (null)
                        }
                        <br/>
                    </div>
                        <h5>Press To Add Education</h5>
                        <button type='button' name='education_input' onClick = {this.toAddField}>Click Me</button>
                        <button type='button' name='education_input' onClick = {this.toDeleteField}>Delete One</button>
                    </div>
                    <br/>
                    <br/>
                    <div>
                    <h5>Work Experince</h5>
                        {(workExperiences.length !== 0) ? ( 
                            workExperiences.map((value, index) => (
                                <div key={value.workTitle}>
                                    <span>Work Title</span>
                                    <input name="workTitle" id={index} onChange={this.forWork} defaultValue={value.workTitle} type='text'></input>
                                    <span>Company</span>
                                    <input name="company" id={index} onChange={this.forWork} defaultValue={value.company} type='text'></input>
                                    <span>Industry</span>
                                    <input name="industry" id={index} onChange={this.forWork} defaultValue={value.industry} type='text'></input>
                                    <span>Start - Year</span>
                                    <input name="startYear" id={index} onChange={this.forWork} defaultValue={value.startYear} type='text'></input>
                                    <span>End - Year</span>
                                    <input name="endYear" id={index} onChange={this.forWork} defaultValue={value.endYear} type='text'></input>
                                    <br/>
                                    <button onClick={this.toDelWork} id={index} type="button">Delete</button>
                                    <br/>
                                    <br/>
                                </div>
                            ))) : (null)
                        }
                        <br/>
                    <div>
                    {(work_input.length !== 0) ? ( 
                            work_input.map((value,index) => (
                                <div key={index}>
                                    <h5>Add Work Experince</h5>
                                    <span>Work Title</span>
                                    <input name="workTitle" id={index} onChange={this.forAddWork} defaultValue={eval("Work[index].workTitle")} type='text'></input>
                                    <span>Company</span>
                                    <input type='text' id={index} onChange={this.forAddWork} defaultValue={eval("Work[index].company")} name="company"></input>
                                    <span>Industry</span>
                                    <input name="industry" id={index} onChange={this.forAddWork} defaultValue={eval("Work[index].industry")} type='text'></input>
                                    <span>Start - Year</span>
                                    <input name="startYear" id={index} onChange={this.forAddWork} defaultValue={eval("Work[index].startYear")} type='text'></input>
                                    <span>End - Year</span>
                                    <input name="endYear" id={index} onChange={this.forAddWork} defaultValue={eval("Work[index].endYear")} type='text'></input>
                                    <br/>
                                    <br/>
                                </div>
                            ))) : (null)
                        }
                        <br/>
                    </div>
                        <h5>Press To Add Experince</h5>
                        <button type='button'  onClick = {this.props.AddWorkField}>Click Me</button>
                        <button type='button'  onClick = {this.props.DeleteWorkField}>Delete One</button>
                    </div>
                    <br/>
                    <br/>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toGoNext} type='button'>Next</button>
                    </form>      
                    </div>
                    </div>
            </div>
        )
    }
}
