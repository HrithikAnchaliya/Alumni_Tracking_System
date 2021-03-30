/*eslint-disable no-eval */

import React from 'react';
import Button from 'react-bootstrap/Button'
import '../Style/toStyleRegister.css'

export default class Workform extends React.Component{

    toGoNext = (event) => {
        event.preventDefault();
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

    render(){
        const { work_input, education_input, degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear } = this.props.field
        // eslint-disable-next-line
        const State = this.props.field;
        return(
                <div>
                    <div className="container is-fluid">
                    <div id='workForm-register-div' className="notification">
                    <form onSubmit={this.toGoNext}>

                    {/* <div className='box'> */}

                    <div class="field">
                    <label class="label">Degree</label>
                    <div class="control">
                        <div class="select">
                        <select required name="degree" onChange={this.props.handlechg} id='degree'>
                            <option value="">Degree</option>
                            <option value="b.tech">B.Tech</option>
                            <option value="b.e">B.E</option>
                        </select>
                        </div>
                    </div>
                </div>

                <label>Selected Degree : {degree}</label>

                <div class="field">
                    <label class="label">Branch</label>
                    <div class="control">
                        <div class="select">
                        <select required name="branch" onChange={this.props.handlechg} id='branch'>
                            <option value="">Branch</option>
                            <option value="cse">Computer Science</option>
                            <option value="mech">Mechanical</option>
                            <option value='civil'>Civil</option>
                        </select>
                        </div>
                    </div>
                </div>

                <label>Selected Branch : {branch}</label>

                <div className="field">
                    <label className="label">Roll Number</label>
                    <div className="control">
                    <input  className="input" placeholder='Roll Number' type='number' onChange={this.props.handlechg} name='rollNumber' defaultValue={rollNumber} step='1'></input>
                    </div>
                </div>

                <div>

                <div className='box'>
                <label>Education</label>

                <div className="field">
                    <label className="label">School/University/College</label>
                    <div className="control">
                    <input  className="input" onChange={this.props.handlechg} name='school' defaultValue={school} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Course</label>
                    <div className="control">
                    <input  className="input" onChange={this.props.handlechg} name='course' defaultValue={course} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start Year</label>
                    <div className="control">
                    <input  className="input"onChange={this.props.handlechg} name='eduStartYear' defaultValue={eduStartYear} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">End - Year</label>
                    <div className="control">
                    <input  className="input" onChange={this.props.handlechg} name='eduEndYear' defaultValue={eduEndYear} type='text'></input>
                    </div>
                </div>

                </div>

                <div>

                {(education_input.length !== 0) ? ( 
                            education_input.map((index) => (
                <div className='box' key={index - 1}>

                <label>Add Education</label>

                <div className="field">
                    <label className="label">School/University/College</label>
                    <div className="control">
                    <input className="input" onChange={this.props.handlechg} name={`school${index}`} defaultValue={eval('State.school'+index)} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Course</label>
                    <div className="control">
                    <input className="input"  onChange={this.props.handlechg} name={`course${index}`} defaultValue={eval("State.course"+index)} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start Year</label>
                    <div className="control">
                    <input className="input" onChange={this.props.handlechg} name={`eduStartYear${index}`} defaultValue={eval("State.eduStartYear"+index)} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">End - Year</label>
                    <div className="control">
                    <input  className="input" onChange={this.props.handlechg} name={`eduEndYear${index}`} defaultValue={eval("State.eduEndYear"+index)} type='text'></input>
                    </div>
                </div>                

                </div>
                ))) : (null)
            }
                </div>

                <div class="field is-grouped">
                    <div class="control">
                        <label>Press To Add Education</label>
                    </div>
                    <div class="control">
                        <Button variant="outline-dark" name='education_input' onClick = {this.toAddField} type='button'>Click Me</Button>
                    </div>
                    <div class="control">
                        <Button name='education_input' onClick = {this.toDeleteField} variant="outline-dark">Delete One</Button>
                    </div>
                </div>

                </div>

                <div>

                <div className='box'>
                <label>Work Experience</label>

                <div className="field">
                    <label className="label">Work Title</label>
                    <div className="control">
                    <input  className="input" name= 'workTitle' onChange={this.props.handlechg} defaultValue={workTitle} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Company</label>
                    <div className="control">
                    <input  className="input" type='text' onChange={this.props.handlechg} defaultValue={company} name='company'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Industry</label>
                    <div className="control">
                    <input  className="input" name='industry' onChange={this.props.handlechg} defaultValue={industry} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start Year</label>
                    <div className="control">
                    <input  className="input" name='workStartYear' onChange={this.props.handlechg} defaultValue={workStartYear} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">End Year</label>
                    <div className="control">
                    <input  className="input"  name='workEndYear' onChange={this.props.handlechg} defaultValue={workEndYear} type='text'></input>
                    </div>
                </div>

                </div>

                <div>

                {(work_input.length !== 0) ? ( 
                            work_input.map((index) => (
                <div className='box' key={index - 1}>

                <label>Add Work Experince</label>

                <div className="field">
                    <label className="label">Work Title</label>
                    <div className="control">
                    <input className="input" name={`workTitle${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workTitle"+index)} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Company</label>
                    <div className="control">
                    <input className="input"   type='text' onChange={this.props.handlechg} defaultValue={eval("State.company"+index)} name={`company${index}`}></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Industry</label>
                    <div className="control">
                    <input className="input" name={`industry${index}`} onChange={this.props.handlechg} defaultValue={eval("State.industry"+index)} type='text'></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Start Year</label>
                    <div className="control">
                    <input  className="input"  name={`workStartYear${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workStartYear"+index)} type='text'></input>
                    </div>
                </div>                
                
                <div className="field">
                    <label className="label">End Year</label>
                    <div className="control">
                    <input  className="input"  name={`workEndYear${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workEndYear"+index)} type='text'></input>
                    </div>
                </div> 

                </div>
                ))) : (null)
            }
                </div>

                </div>

                    <div class="field is-grouped">
                        <div class="control">
                            <label>Press To Add Experince</label>
                        </div>
                        <div class="control">
                            <Button variant="outline-dark" onClick = {this.props.AddWorkField} type='button'>Click Me</Button>
                        </div>
                        <div class="control">
                            <Button onClick = {this.props.DeleteWorkField} variant="outline-dark">Delete One</Button>
                        </div>
                    </div>

                    <br/>

                    <div class="field is-grouped">
                        <div class="control">
                            <Button variant="outline-dark" onClick={this.toGoBack} type='button'>Back</Button>
                        </div>
                        <div class="control">
                            <Button type='submit' variant="outline-dark">Next</Button>
                        </div>
                    </div>

                    </form>      
                    </div>
                    </div>
            </div>
        )
    }
}
