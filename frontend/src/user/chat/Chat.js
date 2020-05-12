import React from 'react'
import {Card} from 'antd'

const temp = "sender"

const Message = (props) =>{
    return(
        <Card size="small" title="Chat with" extra={<a href="/#">More</a>} style={{ width: 300, marginTop:45}}>
            <p className = "sender">Card content</p>
            <p className="reciever">Reciever</p>
            <p>Card content</p>
        </Card>
    )
}
    
export default Message