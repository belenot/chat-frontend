import {StyledMessage} from './styled/StyledMessage';
import {MessageForm} from './MessageForm'
import {useState, useEffect} from 'react'

export const ChatPane = ({className, initMessages=[], sendMessage=f=>f}) => {
    let [messages, setMessages] = useState(initMessages);
    let callback = (newMessages) => {
        setMessages([...messages, newMessages]);
    }
    let onSendMessage = (text) => {
        let message = {text};
        sendMessage(message, callback);
    }

    return (
        <div className={className}>
            <div className="message-list">
                {messages.map(message => (
                    <StyledMessage key={message.id} message={message} />
                ))}
            </div>
            <MessageForm sendMessage={onSendMessage} />
        </div>
    )
}