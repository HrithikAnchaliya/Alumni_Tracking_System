import React, { useEffect, useState } from 'react';
import {shallowEqual, useSelector } from 'react-redux'
import { base_url } from '../../Endpoint/endpoint'
import RoomCard from './RoomCard'
import Spinner from 'react-bootstrap/Spinner'
import { notifyError_with_msg } from '../Utils/Message'


const Rooms = () => {

    let [ error, setError ] = useState(false);
    let [ loading, setLoading ] = useState(true);
    let [ rooms, setRooms ] = useState(null);

    const { token, user } = useSelector(state => ({
        token: state.Auth_token,
        user: state.Auth_user,
      }), shallowEqual);

      
    useEffect (() => {

        async function whenMount(){
            const values = {
                method : "GET",
                headers : {
                    'x-auth' : token,
                } 
            }
            try{
            const response = await fetch(`${base_url}/${user}/chatrooms`, values);
            console.log(response)
            const json = await response.json();
            if (!response.ok) {
                setError(true)
                notifyError_with_msg(json._message);
            }console.log(json)
            if(response.ok){ 
                setRooms(json);
                setLoading(false)
            }}
            catch(error){
                console.log(error)
                setError(true)
                notifyError_with_msg('Unable to Fetch Rooms');
            }
        }    

        whenMount();
    }, [token,user])

    return(
        <div>
            <div className="container is-fluid">
                <div className="notification">
                {!loading ? 
                (
                    <div>{rooms.map((room,index) => <RoomCard key={index} id={room._id} name={room.name}/>)}</div>
                ) : (
                    (!error) ? (
                    <div id='Loading-id'>
                    <Spinner  animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                    </div>) : (null)
                )
                }
                </div>
            </div>
        </div>
    )
}

export default Rooms;