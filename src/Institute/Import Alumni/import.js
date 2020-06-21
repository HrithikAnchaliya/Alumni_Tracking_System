import React, { useState } from "react";


const Import = () => {
    
    const [ excel, setexcel  ] = useState('')
    console.log(excel);

    let onChange = (event) => {
        setexcel(event.target.files[0])
    }

    let onSubmit = async () => {
        console.log(excel);
        let data = new FormData()
            data.append('excel', excel)

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
    }

    return(
        <div>
            <h5>Import Alumni</h5>
            <form onSubmit={onSubmit}>
                    <span>Only Excel Sheet ..</span><br/>
                    <input required name = 'excel' onChange={onChange}  type='file'></input>
                    <br/>
                    <br/>
                    <button type='submit'>Submit</button>
                    </form>
        </div>
    )
}

export default Import