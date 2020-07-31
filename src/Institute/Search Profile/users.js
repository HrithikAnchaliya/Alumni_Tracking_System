import React from 'react';
import { connect } from 'react-redux';
import Profilecard from './profilecard';
import SearchPage from './Searchpage';
import { notifyError_with_msg } from '../Utils/Message'
import '../Style/toStyleSearch.css'

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            values : [],
            loading : true
        }
        
        this.onSearch = this.onSearch.bind(this);
        this.FetchTheSearch = this.FetchTheSearch.bind(this);
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token
            }
        }
        console.log(values)
        let user = this.props.user
        try{
        const fetchUser = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/alumni`,values);
        const json = await fetchUser.json()
        if(!fetchUser.ok){
            notifyError_with_msg(json.err);
        }
        console.log(json);
        if(fetchUser.ok){
        this.setState({
            values : json,
            loading : false
        })
        }}
        catch(error){
            console.log(error);
            notifyError_with_msg(error);
        }
    }

    onSearch = (URL) => {
        this.setState({
            loading : true
        })
        this.FetchTheSearch(URL);
    }

    async FetchTheSearch(URL){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token
            }
        }
        console.log(values)
        try{
        const fetchUser = await fetch(URL,values);
        const json = await fetchUser.json()
        if(!fetchUser.ok){
            this.setState({loading : true})
            notifyError_with_msg("Unable to find ..")
        }
        console.log(json);
        if(fetchUser.ok){
        this.setState({
            values : json,
            loading : false
        })
        }}
        catch(error){
            notifyError_with_msg("Unable to find ..")
            console.log(error);
        }
    }

    render(){
        let { loading, values } = this.state
        return(
            <div>
                <div>
                    <SearchPage
                    onSearch={this.onSearch}/>
                </div>
                {!loading ? (
                        <div id='search-profile-div'>{values.map((data,index) => 
                            (<Profilecard 
                                key={index} 
                                id={data._id} 
                                name={data.firstName}
                                last={data.lastName}
                                email={data.email}
                                branch={data.branch}
                                degree={data.degree}
                                skills={data.skills}
                                location={data.location}
                                socialProfiles={data.socialProfiles}/>))} 
                            </div>
                    ) : (<h5>Searching ..</h5>)}
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


export default connect(mapStatesToProps,null) (Users);
