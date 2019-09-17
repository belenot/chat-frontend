import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";

export const MessageList = ({messages=[]}) => (
    <section className="message-list">
        {messages.map(message => (
            !message._own? 
            <Message key={message.id} message={message} />:
            <OwnMessage key={message.id} message={message} />
        ))}
        
    </section>
)