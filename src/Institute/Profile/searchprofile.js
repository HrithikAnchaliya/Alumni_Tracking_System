import React from 'react';
import Profilecard from './profilecard.js';

export default class Searchprofile extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: '',
            arrayvalue:'',
            loading:true,
            profilesearch:''
          }
        
          this.getdata = this.getdata.bind(this);
          this.aftergetdata = this.aftergetdata.bind(this);
          this.onChangefunc = this.onChangefunc.bind(this);
    }
        async getdata(){
            const url = 'https://jsonplaceholder.typicode.com/users'
            const respones = await fetch(url);
            const users = await respones.json();
            this.setState({
                value:users
            })
            console.log(users[0])
            this.aftergetdata();
        }

        aftergetdata(){
            if(this.state.value){
                const values = this.state.value;
                const dataarray = [];
                Object.keys(values).forEach(key => {
                    dataarray.push(values[key])
                })
                this.setState({
                    arrayvalue:dataarray,
                    loading:false
                });
                // return(
                //     <div>{dataarray.map(data => <Profilecard key={data.id} name={data.name} website={data.website}/>)} </div>
                // );
            }
        }

        

      handleSubmit = e => {
        e.preventDefault();
      };

      onChangefunc = (event) =>{
        this.setState({
          [event.target.name]: event.target.value
        });
      }
      
      

    render(){


        return(
            <div>
                <form>
                <h1>Search</h1>
                <br/>
                {/* <h1>{this.state.value.name}</h1> */}
                <p>Search profiles</p>
                <br/>
                <input type='text' id='profileinput' autoComplete='off' value={this.state.profilesearch} onChange={this.onChangefunc} name='profilesearch'/> 
                <br/>
                <button type='submit' id='profilesubmit'>Submit</button> 
                <button onClick={this.getdata}>Done</button>

                </form>
                <div>
                <Filter/>
                {!this.state.loading ? (
                    <div>{this.state.arrayvalue.map(data => <Profilecard key={data.id} name={data.name} website={data.website}/>)} </div>
                ) : (<h5>Search Something</h5>)}
                </div>
                
            </div>
        );
    }
}

export class Filter extends React.Component{
    render(){
        return(
            <div>
                <label>Filter</label><br/>
                   <div>
                       <Filteryear/>
                       <FilterEducation />
                       <FilterLocation/>
                    </div>
            </div>
        );
    }
}
class Filteryear extends React.Component{
    render(){
        return(
            <div>
                <form>
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
