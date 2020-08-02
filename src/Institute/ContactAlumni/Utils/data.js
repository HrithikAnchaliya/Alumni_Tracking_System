export default function getData(state){
    let { onFocus,  subject, message , eventName, date ,time, venue,category } = state
    if( onFocus === 'custom-email'){
        return { subject, message }
    }
    if( onFocus === 'invite-alumni'){
        return { eventName, date,category, time, venue } 
    }
}