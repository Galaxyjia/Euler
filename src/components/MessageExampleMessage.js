import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageExampleMessage = (props) => (
  <Message>
    <Message.Header>{props.head}</Message.Header>
    <p>
    {props.content}
    </p>
  </Message>
)

export default MessageExampleMessage