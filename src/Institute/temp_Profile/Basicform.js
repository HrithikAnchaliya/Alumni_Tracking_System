import React from 'react';


export default class Basicform extends React.Component{

    toGoNext = () => {
        this.props.goNext();
    }

    render(){
        const {  firstName, lastName, location, startYear, endYear  } = this.props.values.data;
        let { goNext } = this.props.values;
        if(location){
        console.log(location.city)}
        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                <h5>Edit</h5>
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
                    <select name="country" onChange={this.props.handlechg} className="countries order-alpha presel-byip " id="countryId">
                        <option value="">Select Country</option>
                    </select>
                    <br/>
                    { (location) ? 
                    (<span>Selected Country : {location.country}</span>) : (null)
                    }
                    <br/>
                    <br/>
                    <h6>State</h6>
                    <select name="state" onChange={this.props.handlechg} className="states order-alpha" id="stateId">
                        <option value="">Select State</option>
                    </select>
                    <br/>
                    { (location) ? 
                    (<span>Selected Country : {location.state}</span>) : (null)
                    }
                    <br/>
                    <br/>
                    <h6>City</h6>
                    <select name="city" onChange={this.props.handlechg} className="cities order-alpha" id="cityId">
                        <option value="">Select City</option>
                    </select>
                    <br/>
                    { (location) ? 
                    (<span>Selected Country : {location.city}</span>) : (null)
                    }
                    <br/>
                    <br/>
                    {/* <h6>College Name</h6>

                    <select name="collegeName" onChange={this.props.handlechg} id='collegeId'>
                        <option value="">Choose a college</option>
                        <option value="srm">SRM</option>
                        <option value="mnm">MNM</option>
                    </select>
                    <br/>
                    <span>Selected College : {collegeName}</span>
                    <br/>
                    <br/> */}
                    <h6>Start Year</h6>
                    <input type="number" name='startYear' onChange={this.props.handlechg} defaultValue={startYear} step="1" pattern="\d+" /> 
                    <br/>
                    <br/>      
                    <h6>End Year</h6>
                    <input type="number" name='endYear' onChange={this.props.handlechg} defaultValue={endYear} step="1" pattern="\d+" />        
                    <br/>
                    <br/>
                    <button disabled={goNext} type='button' onClick={this.toGoNext}>Next</button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}     