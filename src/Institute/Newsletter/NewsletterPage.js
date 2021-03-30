import React from 'react'
import { base_url } from '../../Endpoint/endpoint'
import { connect } from 'react-redux'
import { notifyError_with_msg } from  '../Utils/Message'
import '../Style/toStyleNewsletter.css'

class NewsletterPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {                                     
            loading: true,
            file : null
            }
        }          
    
       async componentDidMount(){
        let NewsId = this.props.computedMatch.params.id;
        const values = {
            method : "GET",
            headers : {
                'x-auth' : this.props.token,
            }
        }
        console.log(values)
        try{
        let response = await fetch(`${base_url}/${this.props.user}/newsletters/${NewsId}`, values)       
        if(!response.ok){
            notifyError_with_msg('Something Went wrong');
        }
        else{
        const reader = response.body.getReader();
        // getting total length
        const contentLength = +response.headers.get('Content-Length');
        // reading the data
        let receivedLength = 0; // received that many bytes at the moment
        let chunks = []; // array of received binary chunks (comprises the body)
        while(true) {
        let {done, value} = await reader.read();
        
        if (done) {
        break;
        }

        chunks.push(value);
        receivedLength += value.length;
        console.log(`Received ${receivedLength} of ${contentLength}`)
        }
        // concatenate chunks into single Uint8Array - so that the file would support. (Chucks are in array which needs to be combined)
        let chunksAll = new Uint8Array(receivedLength);
        let position = 0;
        for(let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
        }
        console.log(chunksAll)
        const file = new Blob([chunksAll, 'file'], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank', 'nodeIntegration=no');
        }}
        catch(error){
            console.log(error)
            notifyError_with_msg('Unsuccessful to fetch')
        }
    }

    render(){
        console.log(this.state.file)

        return(
            <div>
                {this.state.loading || !this.state.posts ? 
                (<p id='span-news'>Your File is loading .. (Might Take a Minute)</p>) : 
                (
                    <div>
                        <h6>Still Loading</h6>
                    </div>
                )}
            </div>
        );
    }
}


const mapStatesToProps = state => {
    return{
        token : state.Auth_token,
        user:state.Auth_user
    }
}


export default connect(mapStatesToProps,null) (NewsletterPage);
