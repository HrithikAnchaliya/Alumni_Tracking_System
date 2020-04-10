import React from 'react';
import Card from 'react-bootstrap/Card';
import {
  Link
} from "react-router-dom";


export default class Events extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            all:null,
            loading:true
        }
    }

    async componentDidMount(){
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const response = await fetch(url);
        const todos = await response.json();
        this.setState({all:todos, loading:false})
        
    }


    render(){
        const dataarray = [];
        if(this.state.all)               //it means the this.state.all has something
        {
            const stateall = this.state.all;
            Object.keys(stateall).forEach(key => {
                dataarray.push(stateall[key])
            })
            console.log(dataarray);
            return(
                <div>
                <Addeventbutton/>
                <div>{dataarray.map(item => <Evented key={item.id} id={item.id} title={item.title}  />)}</div>
                </div>
                ); 
        }

        if(this.state.loading)          //if this runs it means the loading is true
        {
            return(
            <div>
            <Addeventbutton/> 
            <h4>Loading...</h4>
            </div>
            );
        }

    }
}
class Evented extends React.Component{
    render(){
        return(
            <div>
            <Card style={{ width: '18rem' }}>
            <Card.Body>
            <Card.Title>{this.props.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">07 </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">March 2020 </Card.Subtitle>
            <Card.Text>
            Fucking Be there, bitch
            </Card.Text>
            <Card.Link><Link to={`/events/${this.props.id}`}>Card Link</Link></Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
            </Card>
        </div>
        );
    }
}

class Addeventbutton extends React.Component{
    render(){
        return(
            <div>
                <button><Link to='/events/addevent'>Add Event</Link></button>
            </div>
        )
    }
}
