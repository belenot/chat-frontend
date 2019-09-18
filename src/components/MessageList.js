import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";
import {useEffect} from 'react'

export const MessageList = ({messages=[], login, scrollDown, getPrevMessages=f=>f}) => {
    let section;
    useEffect(()=>{
        section.onscroll = ()=> {
            if (section.scrollTop == 0) {
                console.log("It is the peek");
                getPrevMessages();
            }
        }
        if (scrollDown) {
            section.scrollTop=section.scrollHeight-section.clientHeight
        }
    });
    return (
        <section className="message-list" ref={s=>section=s}>
            {messages.map(message => (
                message.login != login? 
                <Message key={message.id} message={message} />:
                <OwnMessage key={message.id} message={message} />
            ))}
            
        </section>
    )
}