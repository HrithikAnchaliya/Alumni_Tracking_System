import React from 'react'
import Select from 'react-select'
import { YearOptions, BranchOption, selector,cityList } from './Utils/data'
import { intoUrl } from './Utils/data'
import { connect } from 'react-redux'
import { notify_Success, notifyError_with_msg } from  '../Utils/Message'
let countries = require ('countries-cities').getCountries();

class SendEmailInfo extends React.Component{
constructor(props){
    super(props)
    this.state = {
        countryList : [],
        selected : null,
        cityList : [],
        yesno : false,
        selectedCity : []
    
    }
}
    
    componentWillMount = () => {
        let options = YearOptions();
        this.props.setYearList(options);
        let branchOptions = BranchOption();
        this.props.setBranchList(branchOptions);

        let countrylist = selector(countries); 
        this.setState({
            countryList : countrylist
        });
    }

    onChangeCountry = (selectedOption) => {
        this.setState({
            selected : selectedOption
        });
        setTimeout(() => {
            this.toGatherCity();
        },1500);
    }

    toGatherCity = () =>{
        if(this.state.selected){
            let citylist = cityList(this.state.selected.value);
            this.setState({
                cityList : citylist,
                yesno : true
            })
        }
    }

    onChangeCity = (selectedOption) => {
        this.setState({
            selectedCity : selectedOption
        });
    }

    onSubmit = async(e) => {
        e.preventDefault();
        let URL = intoUrl(this.props.data);
        const values = {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'x-auth' : this.props.token
            },
            body : JSON.stringify(this.props.body)
        }
        try{
        const response = await fetch(URL, values);  //Only College can Post
        console.log(response)
        const data = await response.json();
        if (!response.ok) {
            notifyError_with_msg(data.err)
        }
        if(response.ok){
        notify_Success();
        }}
        catch(error){
            notifyError_with_msg('Cannot Send Mail') 
        }
    }

    render(){
        let countryOptions = this.state.countryList;
        console.log(this.state)
        return(
            <div>
                <form onSubmit={this.onSubmit}>

                <div class='box'>

                {( (this.props.user === 'admin') && (this.props.colleges.length !== 0)) ? (
                  
                    <div>
                        <h6>College Name</h6>
                        <Select 
                        required
                        value={this.props.college}
                        options={this.props.colleges}
                        isMulti
                        isSearchable
                        placeholder='Select Colleges ..'
                        name='college'
                        onChange={this.props.onChangeCollege}/>

                    </div>) : (null)}
                    <br/>
                    {(this.props.yearList.length !== 0) ? (
                    <div>
                        <h6>Batch</h6>
                        <Select 
                        required
                        value={this.props.year}
                        options={this.props.yearList}
                        isMulti
                        isSearchable
                        placeholder='Select which Batch ..'
                        name='year'
                        onChange={this.props.setYears}/>

                    </div>) : (null)}
                    <br/>
                    {(this.props.BranchList.length !== 0) ? (
                    <div>
                        <h6>Branch</h6>
                        <Select 
                        required
                        value={this.props.branch}
                        options={this.props.BranchList}
                        isMulti
                        isSearchable
                        placeholder='Select which Branch ..'
                        name='branch'
                        onChange={this.props.setBranch}/>

                    </div>
                    ) : (null)}
                    <br/>

                    <div>
                        <h6>Country</h6>
                        <Select 
                        value={this.state.selected}
                        options={countryOptions}
                        isSearchable
                        placeholder='Select Country'
                        name='location.country'
                        onChange={this.onChangeCountry}/>
                    </div>
                        <br/>
                    <div>
                        { (this.state.yesno) ? (
                            <div>
                            <h6>City</h6>
                            <Select 
                            value={this.state.selectedCity}
                            options={this.state.cityList}
                            isMulti
                            isSearchable
                            placeholder='Select City'
                            name='location.city'
                            onChange={this.onChangeCity}/>
                            <br/>
                            </div>
                        ) : ( null )
                        }
                    </div>
                    <div>

                    <div className="field">
                        <label className="label">Subject</label>
                        <div className="control">
                        <input  className="input" type="text" required placeholder="Subject" name='subject' onChange={this.props.onChangeInput}></input>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                        <textarea  className="textarea" type="text"  placeholder="Message" required name='message' onChange={this.props.onChangeInput}></textarea>
                        </div>
                    </div>

                    </div>

                    <button className="button is-black" type='submit' >Submit</button>

                    </div>

                </form>
            </div>
        )
    }
}

const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user : state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (SendEmailInfo);