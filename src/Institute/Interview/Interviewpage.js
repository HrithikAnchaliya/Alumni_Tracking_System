import React from 'react';
import { connect } from 'react-redux';
import InterviewPageInfo from './InterviewPageInfo'


class InterviewPage extends React.Component{
    constructor(props){
        super(props)
            this.state = {
                interivew : '',
                loading : '',
                arrayed_interview : ''
            }
        this.toArray = this.toArray.bind(this);
    }

    async componentDidMount(){
        let InterviewId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            } 
        }
        try{
        const response = await fetch(`https://alumni-backend-app.herokuapp.com/alumni/interviews/${InterviewId}`, values);
        console.log(response)
        if (!response.ok) {
            throw new Error(response.statusText); // 404
          }
        const json = await response.json();
        console.log(json)
        this.setState({
            interivew : json })
        this.toArray()
        }
        catch(error){
            console.log(error)
        }
    }

    toArray = () => {
        const dataarray = [];
        if(this.state.interivew)              
        {
            const stateall = this.state.interivew;
            console.log(stateall)
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray)
            this.setState({
                arrayed_interview: dataarray,
                loading : false
            })
        }
    }

    render(){
        console.log(this.props.computedMatch.params.id)
        return(
            <div>
                {this.state.loading || !this.state.arrayed_interview ? 
                (<h6>Loading ..</h6>) : 
                (
                    <div>
                        <InterviewPageInfo
                        title={this.state.interivew.workTitle}
                        industry={this.state.interivew.industry}
                        difficulty={this.state.interivew.difficulty}
                        description={this.state.interivew.description}
                        feedback={this.state.interivew.feedback}
                        company={this.state.interivew.company}
                        topics={this.state.arrayed_interview[0]}/>
                    </div>
                )}
            </div>
        )
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token
    }
}


export default connect(mapStatesToProps,null) (InterviewPage);