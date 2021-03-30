// To Store all the details to local Storage.

export  function Serialize(storeToken,storeUser){
    const serialized_token =  storeToken;   //De-parsed
    const serialized_auth = JSON.stringify(true);
    const serialized_user = storeUser;
    window.localStorage.setItem('Auth_state' , serialized_auth )
    window.localStorage.setItem('Auth_token' , serialized_token )
    window.localStorage.setItem('Auth_user', serialized_user)
}



export function Deserialize(){
    window.localStorage.removeItem('Auth_state')
    window.localStorage.removeItem('Auth_token')
    window.localStorage.removeItem('Auth_user')
}
