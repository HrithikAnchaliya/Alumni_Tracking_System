const intialState = {
    Register_state : 'Press Sumbit to Register'
};

const registerstate = (state = intialState, action) => {
    console.log(action)
    switch(action.type){
        case 'Reg_True':
            return{
              ...state,
               Register_state : 'Your are Registered'
            }
        case 'Reg_False':
            return{
                ...state,
                Register_state : 'Did not get Registered'
            }
        default:
            return state;
    }
} 

export default registerstate;
