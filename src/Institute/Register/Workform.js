/*eslint-disable no-eval */

import React from 'react';


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

    render(){
        const { work_input, education_input, degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear } = this.props.field
        // eslint-disable-next-line
        const State = this.props.field;
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
                        <option value="mech">Mechanical Engineering</option>
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
                    <div>
                    <h5>Education</h5>
                    <span>School/University/College</span>
                    <input onChange={this.props.handlechg} name='school' defaultValue={school} type='text'></input>
                    <span>Course</span>
                    <input onChange={this.props.handlechg} name='course' defaultValue={course} type='text'></input>
                    <span>Start - Year</span>
                    <input onChange={this.props.handlechg} name='eduStartYear' defaultValue={eduStartYear} type='text'></input>
                    <span>End - Year</span>
                    <input onChange={this.props.handlechg} name='eduEndYear' defaultValue={eduEndYear} type='text'></input>
                    <br/>
                    <br/>
                    </div>
                    <div>
                        {(education_input.length !== 0) ? ( 
                            education_input.map((index) => (
                                <div key={index - 1}>
                                    <h5>Add Education</h5>
                                    <span>School/University/College</span>
                                    <input onChange={this.props.handlechg} name={`school${index}`} defaultValue={eval('State.school'+index)} type='text'></input>
                                    <span>Course</span>
                                    <input onChange={this.props.handlechg} name={`course${index}`} defaultValue={eval("State.course"+index)} type='text'></input>
                                    <span>Start - Year</span>
                                    <input onChange={this.props.handlechg} name={`eduStartYear${index}`} defaultValue={eval("State.eduStartYear"+index)} type='text'></input>
                                    <span>End - Year</span>
                                    <input onChange={this.props.handlechg} name={`eduEndYear${index}`} defaultValue={eval("State.eduEndYear"+index)} type='text'></input>
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
                    <div>
                    <h5>Work Experience</h5>
                    <span>Work Title</span>
                    <input name= 'workTitle' onChange={this.props.handlechg} defaultValue={workTitle} type='text'></input>
                    <span>Company</span>
                    <input type='text' onChange={this.props.handlechg} defaultValue={company} name='company'></input>
                    <span>Industry</span>
                    <input name='industry' onChange={this.props.handlechg} defaultValue={industry} type='text'></input>
                    <span>Start - Year</span>
                    <input name='workStartYear' onChange={this.props.handlechg} defaultValue={workStartYear} type='text'></input>
                    <span>End - Year</span>
                    <input name='workEndYear' onChange={this.props.handlechg} defaultValue={workEndYear} type='text'></input>
                    </div>
                    <br/> 
                    <div>
                        {(work_input.length !== 0) ? ( 
                            work_input.map((index) => (
                                <div key={index - 1}>
                                    <h5>Add Work Experince</h5>
                                    <span>Work Title</span>
                                    <input name={`workTitle${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workTitle"+index)} type='text'></input>
                                    <span>Company</span>
                                    <input type='text' onChange={this.props.handlechg} defaultValue={eval("State.company"+index)} name={`company${index}`}></input>
                                    <span>Industry</span>
                                    <input name={`industry${index}`} onChange={this.props.handlechg} defaultValue={eval("State.industry"+index)} type='text'></input>
                                    <span>Start - Year</span>
                                    <input name={`workStartYear${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workStartYear"+index)} type='text'></input>
                                    <span>End - Year</span>
                                    <input name={`workEndYear${index}`} onChange={this.props.handlechg} defaultValue={eval("State.workEndYear"+index)} type='text'></input>
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
