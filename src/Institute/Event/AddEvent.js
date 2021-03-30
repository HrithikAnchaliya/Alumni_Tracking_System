import React from 'react';
import update from 'immutability-helper';
import AddEventInfo from './AddEventInfo';
import '../Style/toStyleEvent.css'

export default class AddEvent extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        event : {},
        location : {}
      }
      this.onChange = this.onChange.bind(this);
  }

  onChange= (event) => {
    const data = this.state.event;
    const location = this.state.location;
    if(event.target.name === 'address' || event.target.name === 'country' || event.target.name === 'state' || event.target.name === 'city'){
      const innerArray = update(location,  { [event.target.name]: { $set: event.target.value } });
      this.setState({
        location : innerArray
    });
    }
    else{
    let value = event.target.type === 'number' ? parseInt(event.target.value) : event.target.value;
    const innerArray = update(data, { [event.target.name]: { $set: value } })
    this.setState({
      event : innerArray
  });
  }}

  onChangeEmail = (event) => {
    let data = this.state.event
    let value = null;
    if(event.target.value === 'true'){value = true} else{value = false}
    const innerArray = update(data, { [event.target.name]: { $set: value } })
    this.setState({
      event : innerArray
  });
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <div className="container is-fluid">
        <div id = 'addevent-div-id' className="notification">
          <AddEventInfo
          onChange={this.onChange}
          forEmail={this.onChangeEmail}
          value={this.state}/>
        </div>
        </div>
      </div>
    )
  }
}