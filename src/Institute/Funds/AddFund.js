import React from 'react';
import AddFundInfo from './AddFundInfo'

export default class AddFund extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : '',
            subtitle : '',
            description : '',
            totalRequired : '',
            totalRaised : '' 
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (event) => {
        let value = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
        this.setState({
            [event.target.name] : value
        })
    }

    render(){
        return(
            <div>
                <div className="container is-fluid">
                <div id = 'addevent-div-id' className="notification">
                    <AddFundInfo
                    value = {this.state}
                    onChange={this.onChange}/>
                </div>
                </div>
            </div>
        )
    }
}