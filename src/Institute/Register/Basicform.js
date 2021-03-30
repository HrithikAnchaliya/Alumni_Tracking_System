import React from 'react';
 


export default class Basicform extends React.Component{

    toGoNext = (event) => {
        event.preventDefault();
        this.props.goNext();
    }

    render(){
        const {  firstName, lastName, user, country, state, city, collegeId, startYear, endYear, College_Names_fetch  } = this.props.values;
        return(
            <div>
                <div className="container is-fluid">
                    <div id='workForm-register-div' className="notification">
                <label>Register To Login</label>
                <br/>
                <form onSubmit={this.toGoNext}>

                <div className="field">
                    <label className="label">First Name</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="First Name" required name='firstName' onChange={this.props.handlechg} defaultValue={firstName} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Last Name</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Last Name"name='lastName' onChange={this.props.handlechg} defaultValue={lastName} ></input>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Please select who you are</label>
                    <div class="control">
                        <div class="select">
                        <select  name='user' onChange={this.props.handlechg}>
                            <option value=''></option>
                            <option value='alumni'>Alumni</option>
                            <option value='student'>Student</option>
                        </select>
                        </div>
                    </div>
                </div>

                <label>Selected User : {user}</label>

                <div className="field">
                    <label className="label">Country</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="Country" name="country" onChange={this.props.handlechg} defaultValue={country} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">State</label>
                    <div className="control">
                    <   input  className="input" type="text" placeholder="State"  name="state" onChange={this.props.handlechg} defaultValue={state} ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">City</label>
                    <div className="control">
                    <input  className="input" type="text" placeholder="City"  name="city" onChange={this.props.handlechg} defaultValue={city} ></input>
                    </div>
                </div>

                {(College_Names_fetch.length !== 0) ? (
                <div>

                <div class="field">
                    <label class="label">College Name</label>
                    <div class="control">
                        <div class="select">
                        <select name="collegeId" onChange={this.props.handlechg} id='collegeId'>
                            <option value="">Choose a college</option>
                            {College_Names_fetch.map((data,index) => (
                                <option key={index} value={data._id}>{data.collegeName}</option>
                            ))}
                        </select>
                        </div>
                    </div>
                </div>

                <label>Selected College : {collegeId}</label>

                </div>
                ) : (null)}

                <div className="field">
                    <label className="label">Start Year</label>
                    <div className="control">
                    <input  className="input" type="number" placeholder="Start Year"  name='startYear' onChange={this.props.number} defaultValue={startYear} step="1" pattern="\d+" ></input>
                    </div>
                </div>

                <div className="field">
                    <label className="label">End Year</label>
                    <div className="control">
                    <input  className="input" type="number" placeholder="End Year"  name='endYear' onChange={this.props.number} defaultValue={endYear} step="1" pattern="\d+" ></input>
                    </div>
                </div>
     
                    <button className="button is-black" type='submit' >Next</button>
                </form>
                </div>
                </div>
            </div>
        )
    }
}     