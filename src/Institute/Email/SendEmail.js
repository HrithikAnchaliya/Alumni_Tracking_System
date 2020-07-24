import React from 'react'
import { base_url} from '../../Endpoint/endpoint'
import SendEmailInfo from './SendEmailInfo';
import CollegeOptions from './Utils/data'

export default class SendEmail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            CollegeList : '',
            CollegeOptions : '',
            college : [],
            yearList : '',
            year : [],
            BranchList : '',
            branch : []
        }
        this.onChangeCollege = this.onChangeCollege.bind(this);
        this.callback = this.callback.bind(this);
        this.setYearList = this.setYearList.bind(this);
        this.setYears = this.setYears.bind(this);
    }

    componentDidMount = async () => {
        const values = {
            method : "GET"
        }
        try{
        const response = await fetch(`${base_url}/college`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.status); // 404
        }
        if(response.ok){
        const json = await response.json();
        console.log(json)
        this.setState({CollegeList : json})
        this.callback();
        }}
        catch(error){
            console.log(error)
        }
    }

    callback = () => {
        let colleges = this.state.CollegeList;
        if(colleges !== null){
            let options = CollegeOptions(colleges);
            this.setState({ CollegeOptions : options })
        }
    }

    onChangeCollege = (selectedOption) => {
        this.setState({ college : selectedOption });
    }

    setYearList = (list) => {
        this.setState({ yearList : list });
    }

    setYears = (selectedOption) => {
        this.setState({ year : selectedOption });
    }

    setBranchList = (list) => {
        this.setState({ BranchList : list });
    }

    setBranch = (selectedOption) => {
        this.setState({ branch : selectedOption })
    }

    render(){
        let {college, year, branch } = this.state;
        let data = {college, year, branch }
        return(
            <div>
                <SendEmailInfo 
                college={this.state.college}
                colleges={this.state.CollegeOptions}
                onChangeCollege={this.onChangeCollege}
                setYearList={this.setYearList}
                year={this.state.year}
                yearList={this.state.yearList}
                setYears={this.setYears}
                BranchList={this.state.BranchList}
                branch={this.state.branch}
                setBranchList={this.setBranchList}
                setBranch={this.setBranch}
                data={data}/>
            </div>
        )
    }
}