import React from 'react';


export default class Basicform extends React.Component{

    toGoNext = (event) => {
        event.preventDefault();
        this.props.goNext();
    }

    render(){
        const {  firstName, lastName, user, country, state, city, collegeName, startYear, endYear, College_Names_fetch  } = this.props.values;
        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                <h5>Register To Login</h5>
                <br/>
                <form onSubmit={this.toGoNext}>
                    <h6>First Name</h6>
                    <input required name='firstName' onChange={this.props.handlechg} defaultValue={firstName}></input>
                    <br/>
                    <br/>
                    <h6>Last Name</h6>
                    <input type='name' name='lastName' onChange={this.props.handlechg} defaultValue={lastName}></input>
                    <br/>
                    <br/>
                    <label>Please select who you are</label>
                    <select  name='user' onChange={this.props.handlechg}>
                        <option value=''></option>
                        <option value='alumni'>Alumni</option>
                        <option value='student'>Student</option>
                    </select>
                    <br/>
                    <span>Selected User : {user}</span>
                    <br/>
                    <br/>
                    <h6>Country</h6>
                    <select name="country" onChange={this.props.handlechg} className="countries order-alpha presel-byip " id="countryId">
                        <option value="">Select Country</option>
                    </select>
                    <br/>
                    <span>Selected Country : {country}</span>
                    <br/>
                    <br/>
                    <h6>State</h6>
                    <select name="state" onChange={this.props.handlechg} className="states order-alpha" id="stateId">
                        <option value="">Select State</option>
                    </select>
                    <br/>
                    <span>Selected State : {state}</span>
                    <br/>
                    <br/>
                    <h6>City</h6>
                    <select name="city" onChange={this.props.handlechg} className="cities order-alpha" id="cityId">
                        <option value="">Select City</option>
                    </select>
                    <br/>
                    <span>Selected City : {city}</span>
                    <br/>
                    <br/>
                    {(College_Names_fetch.length !== 0) ? (
                        <div>
                    <h6>College Name</h6>
                    <select  name="collegeName" onChange={this.props.handlechg} id='collegeId'>
                        <option value="">Choose a college</option>
                        {College_Names_fetch.map((data,index) => (
                            <option key={index} value={data.collegeName}>{data.collegeName}</option>
                        ))}
                    </select>
                    <br/>
                    <span>Selected College : {collegeName}</span>
                    <br/>
                    <br/>
                        </div>) : (null)}
                    <h6>Start Year</h6>
                    <input  type="number" name='startYear' onChange={this.props.number} defaultValue={startYear} step="1" pattern="\d+" /> 
                    <br/>
                    <br/>      
                    <h6>End Year</h6>
                    <input  type="number" name='endYear' onChange={this.props.number} defaultValue={endYear} step="1" pattern="\d+" />        
                    <br/>
                    <br/>
                    <button type='submit' >Next</button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}     