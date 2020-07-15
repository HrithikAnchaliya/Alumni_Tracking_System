import React from 'react'
import { connect } from 'react-redux'
import Jobcard from './Jobcard'
import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner'
import { base_url } from '../../Endpoint/endpoint'
import { notifyError_with_msg } from '../Utils/Message'
import './Style/toStyle.css'



class Jobs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all: null,
            loading : true,
            data : null,
            search:null,
            onSearch : false,
            error : false
          }
        
          this.toArray = this.toArray.bind(this);
          this.onSearch = this.onSearch.bind(this);
    }

    onSearch = () => {
        this.setState({
            onSearch : !this.state.onSearch
        })
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        
        const response = await fetch(`${base_url}/${this.props.user}/jobs`, values);
        console.log(response)
        const json = await response.json();
        if (!response.ok) {
            this.setState( {error : true} );
            notifyError_with_msg(json.err);
        }
        if(response.ok){
        console.log(json)
        this.setState({all:json})
        this.toArray()
        }}
        catch(error){
            console.log(error)
            this.setState( {error : true} );
            notifyError_with_msg('Unable to fetch');
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.all.length !== 0)              
        {
            const stateall = this.state.all;
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            this.setState({
                data : dataarray,
                loading : false
            })
        }
    }
    


    render(){
        console.log(this.props.user)
        let search = this.state.search
        let onSearch = this.state.onSearch
        return(
            <div>
                <div id='job-search-div'>
                { (onSearch) ? 
                (<input id='job-search' defaultValue={search}></input>) : (null)
                }
                <img id='search-img' alt="Search" onClick={this.onSearch} src="https://img.icons8.com/cotton/64/000000/search--v1.png"/>
                </div>
                <div className="container div-Container">
                <div className="notification" id="jobcard-div">
                {(this.props.user !== 'student') ? (
                <button id="Addbutton-class" type='button'><Link id='AddButton-Link'  to='/addjobs'>Add Job</Link></button>) : ( null )}
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
                    <Jobcard key={index} 
                    id={item._id}
                    title={item.workTitle} 
                    company={item.company}
                    industry={item.industry}
                    for={item.typeOfJob}
                    salary={item.salaryOffered}
                    description={item.description}
                    skill1={item.skillsRequired[0]}
                    skill2={item.skillsRequired[1]}
                    /> )}</div>
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


export default connect(mapStatesToProps,null) (Jobs);