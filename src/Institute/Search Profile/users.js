import React from 'react';
import { connect } from 'react-redux';
import Profilecard from './profilecard';
import SearchPage from './Searchpage';

class Users extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            values : '',
            loading : true
        }
        
        this.onSearch = this.onSearch.bind(this);
        this.FetchTheSearch = this.FetchTheSearch.bind(this);
    }

    async componentDidMount(){
        const values = {
            method : "GET",
            headers : {
                'x-auth' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk3NDc4Y2MyNDNjNDAzODk3ZGNmZmUiLCJhY2Nlc3MiOiJhdXRoIiwidHlwZSI6ImFsdW1uaSIsImlhdCI6MTU4NzEyNjMzNX0.59RES-zHbUcz6e8RqW5lbvPM0BA_Q0UlqaBu7uAl4Mw"
            }
        }
        console.log(values)
        try{
        const fetchUser = await fetch('https://alumni-backend-app.herokuapp.com/alumni/users?search=IT cto&location.city=chengalpattu',values);
        const json = await fetchUser.json()
        console.log(json);
        this.setState({
            values : json,
            loading : false
        })
        }
        catch(error){
            console.log(error);
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
                'x-auth' : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTk3NDc4Y2MyNDNjNDAzODk3ZGNmZmUiLCJhY2Nlc3MiOiJhdXRoIiwidHlwZSI6ImFsdW1uaSIsImlhdCI6MTU4NzEyNjMzNX0.59RES-zHbUcz6e8RqW5lbvPM0BA_Q0UlqaBu7uAl4Mw"
            }
        }
        console.log(values)
        try{
        const fetchUser = await fetch(URL,values);
        const json = await fetchUser.json()
        console.log(json);
        this.setState({
            values : json,
            loading : false
        })
        }
        catch(error){
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
                {!loading && (values.length !== 0) ? (
                        <div>{values.map((data,index) => 
                            (<Profilecard 
                                key={index} 
                                id={data._id} 
                                name={data.firstName}
                                last={data.lastName}
                                email={data.email}
                                branch={data.branch}
                                college={data.collegeName}
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
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (Users);
