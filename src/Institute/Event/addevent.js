import React from 'react';
import { MDBInput } from "mdbreact";
import Form from 'react-bootstrap/Form'; 
import {Button,ButtonToolbar} from 'react-bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Addevents extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      subtitle: '',
      date:'',
      time:'',
      location:'',
      description:'',
      speakersbio:'',
      organiser:'',
      link:''
    }

    this.onChangefunc = this.onChangefunc.bind(this)

  }
  
  onChangefunc = (event) =>{
    this.setState({
      [event.target.name]: event.target.value
    });
  }


  render(){
      return(
            <div>
              <form>
              <div>
                <h1>Enter The Title</h1>
                <Form.Control style={{width:'25rem'}}type="text" placeholder="" name='title'value={this.state.title} onChange={this.onChangefunc} />
              </div>
              <br/>
              <h4>Enter The Sub-Title</h4>
              <Form.Control style={{width:'25rem'}}type="text" name='subtitle'value={this.state.subtitle} onChange={this.onChangefunc} placeholder="" />
              <br/>
              <div>
                <h6>Enter The Date</h6>
                <input type='date' name='date'value={this.state.date} onChange={this.onChangefunc} ></input>
                <br/>
                <br/>
                <h6>Enter The Time</h6>
                <input type='time' name='time'value={this.state.time} onChange={this.onChangefunc}></input>
                <br/>
                <br/>
                <h6>Enter the location</h6>
                <Form.Control style={{width:'20rem'}}type="text" name='location'value={this.state.location} onChange={this.onChangefunc}placeholder="" />
                <br />
                <h6>Description</h6>
                <MDBInput style={{width:'45rem', height:'15rem'}} name='description'value={this.state.description} onChange={this.onChangefunc} type="textarea" outline />
                <br />
                <h6>Speakers-Bio</h6>
                <MDBInput style={{width:'45rem', height:'7rem'}} type="textarea" name='speakersbio'value={this.state.speakersbio} onChange={this.onChangefunc}outline />
                <br/>
                <h6>Organiser</h6>
                <Form.Control style={{width:'25rem'}}type="text" name='organiser'value={this.state.organiser} onChange={this.onChangefunc} placeholder="" />
                <br/>
                <h6>Link</h6>
                <input type='url'name='link'value={this.state.link} onChange={this.onChangefunc} ></input>
                <br/>
                <br/>
                  <ButtonToolbar>
                  <Button as="input" type="submit" value="Submit"/>
                  <hr/>
                  <Button as="input" type="reset" value="Reset"/>
                  </ButtonToolbar>
                  <br/>
                <br/>
              </div>
              </form>
            </div>
        );
    }
}
