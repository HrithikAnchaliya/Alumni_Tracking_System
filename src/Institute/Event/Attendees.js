import React from 'react';
import { Card, Avatar } from 'antd';
import 'antd/dist/antd.css';


const { Meta } = Card;

export default class Attendees extends React.Component{
render(){
    return(
        <div>

            <Card style={{ width: 300, marginTop: 16 }}>
                <Meta
                    avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /> }
                    title={this.props.name}
                    description="This is the description">
                </Meta>
            </Card>

            <br/>
        </div>
    
    )
}
}
