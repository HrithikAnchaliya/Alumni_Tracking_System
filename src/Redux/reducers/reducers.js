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

  export const loadtoken = () => {
    try{
      const serializedtoken = localStorage.getItem('Auth_token');
      if (serializedtoken === null){
        return null;
      }
      else {
        return serializedtoken;  //De-parsed
      }
    } catch(error){
        return undefined
      }
    }
// New Addition - Users
  export const loaduser = () => {
    try{
      const serializeduser = localStorage.getItem('Auth_user');
      if(serializeduser === null){
        return null;
      }
      else{
        return serializeduser;   //De-parsed
      }
    }
    catch(error){
      return undefined
    }
  }

  
const intialState = {
    Auth_state : loadState(),
    Auth_token : loadtoken(),
    Auth_user : loaduser() //New Addition
    
};


const authstate = (state = intialState, action) => {
    console.log(action)
    switch(action.type){
        case 'Auth_True':
            return{
              ...state,
                Auth_state: !state.Auth_state
            }
        case 'Remove_Token':
            return{
             ...state,
                Auth_token: null,
                Auth_state : false,
                Auth_user : null //New Addition
            }
        case 'Add_Token':
          return{
            ...state,
              Auth_token : action.Auth_token,
              Auth_state : true,
              Auth_user : action.Auth_user  //New Addition
          }
        default:
            return state;
    }
} 

export default authstate;
