import store from '../Redux/store/storage'

let state = store.getState();
let user = state.Auth_user;

export const base_url_user = `https://alumni-backend-app.herokuapp.com/${user}`
export const base_url = 'https://alumni-backend-app.herokuapp.com'