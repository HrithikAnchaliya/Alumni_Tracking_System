import React from 'react';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Interviewcard from './InterviewCard';
import Spinner from 'react-bootstrap/Spinner'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import  './Style/toStyle.css';


class Interviews extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all: [],
            loading : true,
            data : [],
            search:'',
            onSearch : false,
            error : false
          }
        
        this.toArray = this.toArray.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onSearch = () => {
        this.setState({
            onSearch : !this.state.onSearch
        })
    }

    onChange = (event) => {
        this.setState({ search : event.target.value })
    } 

    handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          this.componentDidMount();
        }
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        let {search } = this.state
        const response = await fetch(`${base_url}/${this.props.user}/interviews?search=${search}`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState({ error : true })
            notifyError_with_msg(json.err)
        }
        console.log(json)
        if(response.ok){
        console.log(json)
        this.setState({all:json})
        this.toArray()
        }}
        catch(error){
            console.log(error)
            this.setState({ error : true })
            notifyError_with_msg('unable to fetch')
        }
    }

    toArray = () => {
        const dataarray = [];
            const stateall = this.state.all;
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            this.setState({
                data : dataarray,
                loading : false
            })
    }
    

    render(){
        console.log(this.props.user)
        let { search, onSearch }= this.state
        return(
            <div>
                <div id='job-search-div'>
                <img id='search-img' alt="Search" onClick={this.onSearch} src="https://img.icons8.com/cotton/64/000000/search--v1.png"/>
                { (onSearch) ? 
                (<input onKeyPress={this.handleKeyPress} onChange={this.onChange} id='job-search' value={search}></input>) : (null)
                }
                </div>
                <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {(this.props.user === 'alumni') ? (
                <Link className='button' to='/addinterview'>Add Experience</Link>) : ( null )}
                { this.state.loading || !this.state.data ?
                (
                    (!this.state.error) ? (
                        <div id='Loading-id'>
                        <Spinner  animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                        </Spinner>
                        </div>) : (null)
                ) : (
                    <div id="Jobcard-id">{this.state.data.map((item,index) => 
                    <Interviewcard
                    key={index}
                    company={item.company}
                    id={item._id}
                    difficulty={item.difficulty}
                    industry={item.industry}
                    title={item.workTitle}
                    topic={item.topics}/>
                    )}</div>
                ) }
                </div>
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


export default connect(mapStatesToProps,null) (Interviews);