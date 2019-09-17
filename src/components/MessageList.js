import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";

export const MessageList = ({messages=[], login}) => (
    <section className="message-list">
        {messages.map(message => (
            message.login != login? 
            <Message key={message.id} message={message} />:
            <OwnMessage key={message.id} message={message} />
        ))}
        
    </section>
)