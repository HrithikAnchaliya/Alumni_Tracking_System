import React from 'react';



export default class Basicform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    render(){
        const {  firstName, lastName, country, state, city, collegeName, startYear, endYear  } = this.props.values;
        return(
            <div>
                <h5>Register To Login</h5>
                <br/>
                <form>
                    <h6>First Name</h6>
                    <input  name='firstName' onChange={this.props.handlechg} defaultValue={firstName}></input>
                    <br/>
                    <br/>
                    <h6>Last Name</h6>
                    <input type='name' name='lastName' onChange={this.props.handlechg} defaultValue={lastName}></input>
                    <br/>
                    <br/>
                    <h6>Country</h6>
                    <select name="country" onChange={this.props.handlechg} className="countries" id="countryId">
                        <option value="">Select Country</option>
                    </select>
                    <br/>
                    <h7>Selected Country : {country}</h7>
                    <br/>
                    <br/>
                    <h6>State</h6>
                    <select name="state"  onChange={this.props.handlechg} className="states" id="stateId">
                        <option value="">Select State</option>
                    </select>
                    <br/>
                    <h7>Selected State : {state}</h7>
                    <br/>
                    <br/>
                    <h6>City</h6>
                   <select name="city"  onChange={this.props.handlechg} className="cities" id="cityId">
                        <option value="">Select City</option>
                    </select>
                    <br/>
                    <h7>Selected City : {city}</h7>
                    <br/>
                    <br/>
                    <h6>College Name</h6>

                    <select name="collegeName" onChange={this.props.handlechg} id='collegeId'>
                        <option value="">Choose a college</option>
                        <option value="srm">SRM</option>
                        <option value="mnm">MNM</option>
                    </select>
                    <br/>
                    <h7>Selected College : {collegeName}</h7>
                    <br/>
                    <br/>
                    <h6>Start Year</h6>
                    <input type="number" name='startYear' onChange={this.props.number} defaultValue={startYear} step="1" pattern="\d+" /> 
                    <br/>
                    <br/>      
                    <h6>End Year</h6>
                    <input type="number" name='endYear' onChange={this.props.number} defaultValue={endYear} step="1" pattern="\d+" />        
                    <br/>
                    <br/>
                    <button type='button' onClick={this.toGoNext}>Next</button>
                </form>
            </div>
        )
    }
}     