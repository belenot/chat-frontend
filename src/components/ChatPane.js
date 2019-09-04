import {StyledMessage} from './styled/StyledMessage';
import {StyledOwnedMessage} from './styled/StyledOwnedMessage';
import {StyledMessageForm} from './styled/StyledMessageForm'
import {useState, useEffect} from 'react'

export const ChatPane = ({className, theme, initMessages=[], currentClientLogin="", sendMessage=f=>f, provideMessages=f=>f}) => {
    let [messages, setMessages] = useState(initMessages);
    if (initMessages.length > messages.length) {
        setMessages([...initMessages]);
    }
    provideMessages(() => messages);
    let onSendMessage = (text) => {
        let message = {text};
        sendMessage(message);
    }
    let msgList;
    useEffect(() => {msgList.scrollTop = msgList.scrollHeight});

    return (
        <div className={className}>
            <div className="message-list" ref={d => msgList = d}>
                {messages.map(message => (
                    message.client.login != currentClientLogin 
                    ?
                    <StyledMessage theme={theme} key={message.id} message={message} />
                    :
                    <StyledOwnedMessage theme={theme} key={message.id} message={message} />
                ))}
            </div>
            <StyledMessageForm theme={theme} sendMessage={onSendMessage} />
        </div>
    )
}