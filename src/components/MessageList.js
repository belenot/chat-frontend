import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";
import {useEffect} from 'react'

export const MessageList = ({messages=[], login, setMessagesListRef=f=>f}) => {
    return (
        <section className="message-list" ref={s=>setMessagesListRef(s)}>
            {messages.map(message => (
                message.login != login? 
                <Message key={message.id} message={message} />:
                <OwnMessage key={message.id} message={message} />
            ))}
            
        </section>
    )
}