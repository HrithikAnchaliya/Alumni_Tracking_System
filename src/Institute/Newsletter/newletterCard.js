import React from 'react';
import { Link } from "react-router-dom";
import '../Style/toStyleNewsletter.css'

const NewsletterCard = (props) => {
    console.log(props)
    return(
        <div>
            <Link to={`/newsletters/${props.id}`}><img alt='LetterBook'src={require('./LetterBook.png')}></img></Link>
            <br/>
            <span><p id='newsletter-name'>{props.name}</p></span>
        </div>
    )
}

export default NewsletterCard;