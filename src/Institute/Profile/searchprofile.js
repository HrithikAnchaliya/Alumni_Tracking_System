import React from 'react';
import Profilecard from './profilecard.js';



export default class Searchprofile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '',
          profiledict : {
             'name' : [],
             'name1' : []
          }
            
          }

          this.getdata = this.getdata.bind(this)
    }
        getdata(){
        const dict = {};
        // const dictname = {};
        // const dictdetails = {}; 
        const url = 'https://jsonplaceholder.typicode.com/users';
        fetch(url)
        .then(response => response.json())
        .then(data => {
            data.forEach(profile => {
                console.log(profile.username)
                dict[`${profile.name}`] = `${profile.username}` 
                
            })
        })

        this.setState({
            
        })
        console.log(dict)  

        }
    
        

      handleSubmit = e => {
        e.preventDefault();
        this.setState({ value: this.textInput.value})
      };
      
      

    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                <h1>Search</h1>
                <br/>
                <h1>{this.state.value}</h1>
                <p>Search profiles</p>
                <br/>
                <input type='text' id='profileinput' autoComplete='off' ref={e => this.textInput = e} name='profilesearch'/> 
                <br/>
                <button type='submit' id='profilesubmit'>Submit</button> 
                <button onClick={this.getdata}>Done</button>

                </form>
                <div>
                <Filter/>
                </div>
                
            </div>
        );
    }
}

export class Filter extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <label>Filter</label><br/>
                    <button>Year</button><br/>
                    <div>
                        <input type='text' name='inputtedtext'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="2000"></input>
                        <label for="vehicle1">2000</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="20001"></input>
                        <label for="vehicle2">20001</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="2002"></input>
                        <label for="vehicle3">2002</label><br/><br/>
                        <input type="submit" value="Submit"></input>
                        <br/>
                        <br/>
                    </div>
                   <div>
                       <FilterEducation />
                       <FilterLocation/>
                       <Profilecard />
                    </div>
                </form>
            </div>
        );
    }
}
 export class FilterEducation extends React.Component{
     render(){
         return(
             <div>
                 <button>Education</button><br/>
                 <div>
                 <button>course</button><button>Branch</button><br/>
                 <div id='Course'>
                 <input type='text' name='inputtedEdText'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="B.Education"></input>
                        <label for="vehicle1">B.Education</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="B.Tech"></input>
                        <label for="vehicle2">B.Tech</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="B.Arch"></input>
                        <label for="vehicle3">B.Arch</label><br/><br/>
                        <input type="submit" value="Submit"></input>
                </div>
                <div id='Branch'>
                <input type='text' name='inputtedEdText'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="computer Science"></input>
                        <label for="vehicle1">Computer Scinece</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="EEE"></input>
                        <label for="vehicle2">EEE</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Arch"></input>
                        <label for="vehicle3">Arch</label><br/><br/>
                        <input type="submit" value="Submit"></input>
                </div>
                </div>
                
                </div>
         );
     }
 }
 export class FilterLocation extends React.Component{
    render(){
        return(
            <div>
                <button>Location</button><br/>
                <div>
                <button>Country</button><button>State</button><button>City</button><br/>  
                <div id='Country'>
                <input type='text' name='inputtedEdText'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="India"></input>
                        <label for="vehicle1">India</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="USA"></input>
                        <label for="vehicle2">USA</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Canada"></input>
                        <label for="vehicle3">Canada</label><br/><br/>
                        <input type="submit" value="Submit"></input>  
                </div>
                <div id='State'>
                <input type='text' name='inputtedEdText'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Tamil Nadu"></input>
                        <label for="vehicle1">Tamil Nadu</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="Goa"></input>
                        <label for="vehicle2">Goa</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="Kashmir"></input>
                        <label for="vehicle3">Kashmir</label><br/><br/>
                        <input type="submit" value="Submit"></input>  
                </div>
                <div id='City'>
                <input type='text' name='inputtedEdText'></input><br/>
                        <input type="checkbox" id="vehicle1" name="vehicle1" value="Chennai"></input>
                        <label for="vehicle1">Chennai</label><br/>
                        <input type="checkbox" id="vehicle2" name="vehicle2" value="bangalore"></input>
                        <label for="vehicle2">bangalore</label><br/>
                        <input type="checkbox" id="vehicle3" name="vehicle3" value="New Delhi"></input>
                        <label for="vehicle3">New Delhi</label><br/><br/>
                        <input type="submit" value="Submit"></input>  
                </div>
                </div>
            </div>
        );
    }
 }
