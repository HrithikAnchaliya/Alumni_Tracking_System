import React from 'react';
import TicketInfo from './TicketInfo'


export default class RaiseTicket extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title : '',
            subTitle : '',
            description : ''
        }

        this.toChange = this.toChange.bind(this);
    }

    toChange = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render(){
        console.log(this.state)
        const {title , subTitle , description} = this.state;
        const values = {title , subTitle , description};

        return(
            <div>
                <TicketInfo
                values={values}
                toChange={this.toChange}/>
            </div>
        )
    }
}
