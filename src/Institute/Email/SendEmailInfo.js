import React from 'react'
import Select from 'react-select'
import { YearOptions, BranchOption } from './Utils/data'
// import { base_url} from '../../Endpoint/endpoint'

export default class SendEmailInfo extends React.Component{

    
    componentWillMount = () => {
        let options = YearOptions();
        this.props.setYearList(options);
        let branchOptions = BranchOption();
        this.props.setBranchList(branchOptions);
    }

    render(){
        return(
            <div>
                {(this.props.colleges.length !== 0) ? (
                    <div>
                        <h6>College Name</h6>
                        <Select 
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
                        value={this.props.branch}
                        options={this.props.BranchList}
                        isMulti
                        isSearchable
                        placeholder='Select which Branch ..'
                        name='branch'
                        onChange={this.props.setBranch}/>

                    </div>) : (null)}

            </div>
        )
    }
}