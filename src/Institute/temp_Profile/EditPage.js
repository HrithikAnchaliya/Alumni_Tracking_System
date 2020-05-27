import React from 'react';

export default class EditPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            education_input : [],
            EduField0: "Hello",
            EduField1 : "Fuck"
        }

        this.Addfield = this.Addfield.bind(this);
        this.Deletefield = this.Deletefield.bind(this);
    }

    Addfield = () => {
        const field = this.state.education_input;
        const size = field.length + 1;
        field.push(size)
        this.setState({
            education_input : field
        })
    }

    Deletefield = () => {
        const field = this.state.education_input;
        field.pop()
        this.setState({
            education_input : field
        })
    }

    onchange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render(){
        console.log(this.state)
        let valut = this.state.EduField1
        return(
            <div>
                <div className="container is-fluid">
                    <div className="notification">
                    <h5>Press To add Input Field</h5>
                    <button onClick = {this.Addfield}>Click Me</button>
                    <button onClick = {this.Deletefield}>Delete One</button>
                    { this.state.education_input.map((index) => (
                        <div key={index - 1}>
                            <input onChange={this.onchange}  value={valut} name={`EduField${index}`}></input>
                            <br/>
                        </div>
                    ))}  
                    </div>
                </div>
                
            </div>
        )
    }
}
