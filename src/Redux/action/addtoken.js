const Add_token =  () => {
    const deserialized_token = JSON.parse(localStorage.getItem('Auth_token'))
    return{
        type: 'Add_Token',
        Auth_token: deserialized_token
    }
}

export default Add_token;
