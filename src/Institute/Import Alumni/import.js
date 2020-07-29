import React, { useState } from "react";
import {shallowEqual, useSelector } from 'react-redux'
import { notifyError_with_msg, notify_Success_msg} from '../Utils/Message'

const Import = () => {
    
    const { token, user } = useSelector(state => ({
        token: state.Auth_token,
        user: state.Auth_user,
      }), shallowEqual);

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
                headers : {
                    'x-auth' : token,
                },
                body : data
            }
            try{
            const response = await fetch(`https://alumni-backend-app.herokuapp.com/${user}/insertAlumniExcel`,values)
            // const json = await response.json()
            if(!response.ok){
                notifyError_with_msg(response.err)
            }
            if(response.ok){
                notify_Success_msg("Successfully Imported")
            }}
            catch(error){
                notifyError_with_msg("Unable To Import")
                
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