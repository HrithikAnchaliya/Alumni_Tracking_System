const Add_token =  () => {
    const deserialized_token = localStorage.getItem('Auth_token');   //De-Parse (being not used - now)
    const deserialized_user = localStorage.getItem('Auth_user');
    return{
        type: 'Add_Token',
        Auth_token: deserialized_token,
        Auth_user: deserialized_user
    }
}

export default Add_token;
