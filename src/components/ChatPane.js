import {StyledMessage} from './styled/StyledMessage';
import {StyledMessageForm} from './styled/StyledMessageForm'
import {useState, useEffect} from 'react'

export const ChatPane = ({className, initMessages=[], sendMessage=f=>f, provideMessages=f=>f}) => {
    let [messages, setMessages] = useState(initMessages);    
    if (initMessages.length > messages.length) {
        setMessages([...initMessages]);
    }
    provideMessages(() => messages);
    let onSendMessage = (text) => {
        let message = {text};
        sendMessage(message);
    }

    return (
        <div className={className}>
            <div className="message-list">
                {messages.map(message => (
                    <StyledMessage key={message.id} message={message} />
                ))}
            </div>
            <StyledMessageForm sendMessage={onSendMessage} />
        </div>
    )
}