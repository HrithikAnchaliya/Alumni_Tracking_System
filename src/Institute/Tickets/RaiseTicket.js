import React from 'react';
import TicketInfo from './TicketInfo'
import '../Style/toStyleTicket.css'

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
            <div className="container is-fluid">
                <div id = 'raiseticket-div-id' className="notification">
                <TicketInfo
                values={values}
                toChange={this.toChange}/>
                </div>
            </div>
        )
    }
}
