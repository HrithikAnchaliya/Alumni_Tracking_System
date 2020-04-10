export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('Auth_state');
      if (serializedState === null) {
        return false;
      }
      else{
      return true;
      }
    } catch (err) {
      return undefined;
    }
  }; 

const intialState = {
    Auth_state : loadState()
    
};


const authstate = (state = intialState, action) => {
    console.log(action)
    switch(action.type){
        case 'Auth_True':
            return{
              ...state,
                Auth_state: !state.Auth_state
            }
        case 'Auth_False':
            return{
             ...state,
                Auth_state: !state.Auth_state
            }
        default:
            return state;
    }
} 

export default authstate;
