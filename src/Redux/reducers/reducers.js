const intialState = {
    Auth_state : 'React'
};

const authstate = (state = intialState, action) => {
    console.log(action)
    switch(action.type){
        case 'Auth_True':
            return{
              ...state,
                Auth_state: action.Auth_state
            }
        case 'Auth_False':
            return{
             ...state,
                Auth_state: action.Auth_state
            }
        default:
            return state;
    }
} 

export default authstate;
