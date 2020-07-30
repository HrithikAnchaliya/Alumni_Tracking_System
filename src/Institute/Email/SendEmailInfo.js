import React from 'react'
import Select from 'react-select'
import { YearOptions, BranchOption } from './Utils/data'
import { intoUrl } from './Utils/data'
import { connect } from 'react-redux'
import { notify_Success, notifyError_with_msg } from  '../Utils/Message'

 
class SendEmailInfo extends React.Component{

    
    componentWillMount = () => {
        let options = YearOptions();
        this.props.setYearList(options);
        let branchOptions = BranchOption();
        this.props.setBranchList(branchOptions);
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
        return(
            <div>
                <form onSubmit={this.onSubmit}>
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
                        <label>Subject</label>
                        <input required name='subject' onChange={this.props.onChangeInput}></input>
                        <br/>
                        <label>Message</label>
                        <textarea required name='message' onChange={this.props.onChangeInput}></textarea>
                    </div>
                    <br/>
                    <button type='submit'>Submit</button>
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