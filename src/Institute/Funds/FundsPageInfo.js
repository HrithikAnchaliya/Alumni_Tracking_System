import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
// import { Link } from 'react-router-dom';


export default class FundsPageInfo extends React.Component{
    render(){
        let { title, subtitle, description, totalRaised, totalRequired} = this.props.fund
        console.log(totalRaised)
        return(
            <div>
                <hr/>
                <span>
                <h5>{title}</h5>
                <span>{subtitle}</span>
                </span>
                <hr/>
                <br/>
                <span>
                <h5>Description </h5><span>{description}</span>
                </span>
                <hr/>
                <span>
                    <h5>Progress</h5>
                    <br/>
                    <ProgressBar animated now={totalRaised} max={totalRequired}/>
                </span>
                <hr/>
                <br/>
                <span>
                    {/* <Link>Raise</Link> */}
                </span>
            </div>
        )
    }
}