const Add_token =  () => {
    const deserialized_token = JSON.parse(localStorage.getItem('Auth_token'))
    const deserialized_user = JSON.parse(localStorage.getItem('Auth_user'))
    return{
        type: 'Add_Token',
        Auth_token: deserialized_token,
        Auth_user: deserialized_user
    }
}

export default Add_token;
