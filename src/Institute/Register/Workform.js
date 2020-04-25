import React from 'react';



export default class Workform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    toGoBack = () => {
        this.props.goBack();
    }


    render(){
        const { degree, branch, rollNumber, school, course, eduStartYear, eduEndYear, workTitle, company, industry, workStartYear, workEndYear } = this.props.values
        return(
                <div>
                    <form>
                    <h6>Degree</h6>
                    <select name="degree" onChange={this.props.handlechg} id='degree'>
                        <option value="">Degree</option>
                        <option value="b.tech">B.Tech</option>
                        <option value="b.e">B.E</option>
                    </select>
                    <br/>
                    <h7>Selected Degree : {degree}</h7>
                    <br/>
                    <br/>
                    <h6>Branch</h6>
                    <select name="branch" onChange={this.props.handlechg} id='branch'>
                        <option value="">Branch</option>
                        <option value="cse">Computer Science</option>
                        <option value="mech">Mechanical Engineering</option>
                    </select>
                    <br/>
                    <h7>Selected Branch : {branch}</h7>
                    <br/>
                    <br/>
                    <h6>Roll Number</h6>
                    <input type='number' onChange={this.props.handlechg} name='rollNumber' defaultValue={rollNumber} step='1'></input>
                    <br/>
                    <br/>
                    <div>
                    <h5>Education</h5>
                    <h6>School/University/College</h6>
                    <input onChange={this.props.handlechg} name='school' defaultValue={school} type='text'></input>
                    <h7>Course</h7>
                    <input onChange={this.props.handlechg} name='course' defaultValue={course} type='text'></input>
                    <h7>Start - Year</h7>
                    <input onChange={this.props.handlechg} name='eduStartYear' defaultValue={eduStartYear} type='text'></input>
                    <h7>End - Year</h7>
                    <input onChange={this.props.handlechg} name='eduEndYear' defaultValue={eduEndYear} type='text'></input>
                    </div>
                    <br/>
                    <br/>
                    <div>
                    <h5>Work - Experience</h5>
                    <h7>Work Title</h7>
                    <input name= 'workTitle' onChange={this.props.handlechg} defaultValue={workTitle} type='text'></input>
                    <h7>Company</h7>
                    <input type='text' onChange={this.props.handlechg} defaultValue={company} name='company'></input>
                    <h7>Industry</h7>
                    <input name='industry' onChange={this.props.handlechg} defaultValue={industry} type='text'></input>
                    <h7>Start - Year</h7>
                    <input name='workStartYear' onChange={this.props.handlechg} defaultValue={workStartYear} type='text'></input>
                    <h7>End - Year</h7>
                    <input name='workEndYear' onChange={this.props.handlechg} defaultValue={workEndYear} type='text'></input>
                    </div>
                    <br/> 
                    <br/>
                    <br/>
                    <button onClick={this.toGoBack} type='button'>Back</button>
                    <button onClick={this.toGoNext} type='button'>Next</button>
                    </form>      
            </div>
        )
    }
}
