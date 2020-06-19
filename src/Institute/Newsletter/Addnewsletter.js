import React from 'react';

export default class Addnewsletter extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            file : ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange = (event) => {
        this.setState({
        file :  event.target.files[0]
    })}

    onSubmit = async (e) => {
        e.preventDefault();
        const { file } = this.state;
        if(file.type === "application/pdf"){
            console.log("Uploading")
            let data = new FormData()
            data.append('files', file)

            const values = {
                method : "POST",
                body : data
            }
            try{
            const response = await fetch('http://localhost:4000/college/newsletters',values)
            const json = await response.json()
            if(!response.ok){
                throw new Error(response.status); // 404
            }
            console.log(json)
        }
            catch(error){
                console.log(error)
                
            }
                // console.log(values)
                for (let pair of data.entries()) {
                    console.log(pair[0]+ ', ' + pair[1]); 
                }
        }
        else alert('Please Upload a PDF')
    }

    render(){
        console.log(this.state.file)
        return(
            <div>
                <div className="container">
                    <div className="notification">
                    <form onSubmit={this.onSubmit}>
                    <h5>Input a file</h5><br/>
                    <input required name = 'file' onChange={this.onChange}  type='file'></input>
                    <br/>
                    <br/>
                    <button type='submit'>Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}
