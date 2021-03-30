import { Message } from 'react-chat-ui'

const loadChat = (data) => {
    console.log(data);
    let message = [];
    let userId = data.currentUserId
    console.log(userId);
    data.messages.forEach(element => {
        console.log(element.senderId._id);
        if(userId !== element.senderId._id){
            let innerobj = {id:'', message:'', senderName:''}
            innerobj.id = element.senderId._id
            innerobj.message = element.message
            innerobj.senderName = (element.senderId.firstName) || (element.senderId.collegeName) || (element.senderId.adminName) 
            let obj = new Message(innerobj);
            message.push(obj);
        }
        else{
            let innerobj = {id:0, message:'', senderName:''}
            innerobj.message = element.message
            innerobj.senderName = (element.senderId.firstName) || (element.senderId.collegeName) || (element.senderId.adminName) 
            let obj = new Message(innerobj);
            message.push(obj);
        }
    })

    console.log(message);
    return message;
}

export const pushToChat = (data) => {
    let innerobj = {id:'', message:'', senderName:''}
    innerobj.id = data.newMessage.senderId._id
    innerobj.message = data.newMessage.message
    innerobj.senderName = (data.newMessage.senderId.firstName) || (data.newMessage.senderId.collegeName) || (data.newMessage.senderId.adminName) || null
    let obj = new Message(innerobj);

    return obj;
}

export const pushUserChat = (data) => {
    let innerobj = {id:0, message:'', senderName:null}
    innerobj.message = data
    let obj = new Message(innerobj);

    return obj;
}

export const fetchByCategory = (data) => {
    let { category } = data;
    if(category === 'year'){
        let { category, year } = data;
        return { category, year }
    }
    if(category === 'yearCourse'){
        let { category, year, course } = data;
        return { category, year, course }
    }
    if(category === 'interest'){
        let { category, name } = data;
        return { category, name }
    }
}

export default loadChat;

