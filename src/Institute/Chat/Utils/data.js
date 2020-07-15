import { Message } from 'react-chat-ui'

const loadChat = (data) => {
    console.log(data);
    let message = [];
    let userId = data.currentUserId
    
    data.messages.forEach(element => {
        if(userId !== element.senderId._id){
            let innerobj = {id:'', message:'', senderName:''}
            innerobj.id = element.senderId._id
            innerobj.message = element.message
            innerobj.senderName = (element.senderId.firstName) || (element.senderId.collegeName)
            let obj = new Message(innerobj);
            message.push(obj);
        }
        else{
            let innerobj = {id:0, message:'', senderName:''}
            innerobj.message = element.message
            innerobj.senderName = (element.senderId.firstName) || (element.senderId.collegeName) || null
            let obj = new Message(innerobj);
            message.push(obj);
        }
    })

    console.log(message);
    return message;
}

export const pushToChat = (data) => {
    let innerobj = {id:'', message:'', senderName:''}
    innerobj.id = data.newMessage.senderId
    innerobj.message = data.newMessage.message
    innerobj.senderName = (data.newMessage.firstName) || (data.newMessage.collegeName) || null
    let obj = new Message(innerobj);

    return obj;
}

export const pushUserChat = (data) => {
    let innerobj = {id:0, message:'', senderName:null}
    innerobj.message = data
    let obj = new Message(innerobj);

    return obj;
}

export default loadChat;

