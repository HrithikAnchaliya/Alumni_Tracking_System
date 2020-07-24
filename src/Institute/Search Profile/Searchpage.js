import React from 'react';
import 'bulma/css/bulma.css';
import Select from 'react-select';
import { selector, cityList, intoUrl } from './Utils/data'
import { connect } from 'react-redux';
import { notifyError_with_msg } from '../Utils/Message'
import CollegeOptions from '../Email/Utils/data'
let countries = require ('countries-cities').getCountries();


class SearchPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            searchvalue : '',
            yearvalue : '',
            yesno : false,
            selected : null,
            selectedCity : '',
            countryList : [],
            cityList : [],
            collegesList : [],
            selectedCollege : []
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toGatherCity = this.toGatherCity.bind(this);
        this.onChangeCity = this.onChangeCity.bind(this);
        this.onChangeCountry = this.onChangeCountry.bind(this);
        this.onChangeCollege = this.onChangeCollege.bind(this);

    }

    componentDidMount = async() => {
        let countrylist = selector(countries); 
        this.setState({
            countryList : countrylist
        });
        if(this.props.user === 'admin'){
        const values = {
            method : "GET"
        }
        console.log(values)
        try{
        const fetchUser = await fetch(`https://alumni-backend-app.herokuapp.com/college`,values);
        const json = await fetchUser.json()
        if(!fetchUser.ok){
            notifyError_with_msg(json.err);
        }
        console.log(json);
        if(fetchUser.ok){
        let list = CollegeOptions(json);
        this.setState({ collegesList : list });
        }}
        catch(error){
            console.log(error);
            notifyError_with_msg(error);
        }}
    }

    onChange = (event) => {
        this.setState({
        [event.target.name] : event.target.value
    })}

    onSubmit = (e) => {
        e.preventDefault();
        let { searchvalue, yearvalue, selectedCity, selectedCollege } = this.state
        let state = { searchvalue, yearvalue, selectedCity, selectedCollege} 
        let url = intoUrl(state);
        console.log(url);
        this.props.onSearch(url);
    }
    

    onChangeCountry = (selectedOption) => {
        this.setState({
            selected : selectedOption
            // isSelected : true
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

    onChangeCollege = (selectedOption) => {
        this.setState({
            selectedCollege : selectedOption
        });
    }

    render(){
        let countryOptions = this.state.countryList;
    
        // console.log(this.state)

        return(
            <div>
                <div>
                <form  onSubmit={this.onSubmit}>
                <article className="panel is-primary">
                <p className="panel-heading">
                    Search
                </p>
                <p className="panel-tabs">
                    <a href='http://www.google.com'className="is-active">Search</a>
                    <a href='http://www.google.com'>Year</a>
                    <a href='http://www.google.com'>Location</a>
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                    <input onChange={this.onChange} value = {this.state.searchvalue} name = "searchvalue" className="input is-primary" type="text" placeholder="Search"></input>
                    <span className="icon is-left">
                        <i className="fas fa-search" aria-hidden="true"></i>
                    </span>
                    </p>
                </div>
                </article>
                <label>Year</label>
                <br/>
                <select name='yearvalue' onChange={this.onChange}>
                    <option>Select Year</option>
                    <option value='2011'>2011</option>
                    <option value='2012'>2012</option>
                    <option value='2013'>2013</option>
                    <option value='2016'>2016</option>
                    <option value='2018'>2018</option>
                    <option value='2019'>2019</option>
                    <option value='2020'>2020</option>
                    <option value='2021'>2021</option>
                </select>
                
                <div>
                    <br/>   
                    <label>Search Country: </label> 
                    <Select 
                    value={this.state.selected}
                    options={countryOptions}
                    isSearchable
                    placeholder='Select Country'
                    name='location.country'
                    onChange={this.onChangeCountry}/>
                    <br/>
                </div>
                <div>
                    { (this.state.yesno) ? (
                        <div>
                        Search City:
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
                    { ((this.props.user === 'admin') && (this.state.collegesList))   ? (
                        <div>
                        Select College:
                        <Select
                        value={this.state.selectedCollege}
                        options={this.state.collegesList}
                        isMulti
                        isSearchable
                        placeholder='Select College'
                        name='collegeId'
                        onChange={this.onChangeCollege}/>
                        <br/>
                        </div>
                    ) : ( null )
                    }
                </div>
                    <button type='submit'>Submit</button>
                    </form>
                </div>
                <br/>
                <div>
                    {/* <Users/> */}
                </div>
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


export default connect(mapStatesToProps,null) (SearchPage);