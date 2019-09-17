import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendForm } from "./SendForm"
import {useState} from 'react';
import {useEffect} from 'react';
import Stomp from 'stompjs';

export const Chat = ({chat, events, send=f=>f, wsClient=Stomp.over(null)}) => {
    let [messagesState, setMessagesState] = useState([]);
    let [ws, setWs] = useState({client: wsClient, subscription: -1});
    let messageCreatedId = -1;
    useEffect(()=>{
        return () => {
            events.unlisten("messageCreated", messageCreatedId);
        }
    })
    if (ws.subscription < 0) {
        let csrfToken=document.querySelector("meta[name='csrf-token']").content;
        let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
        let subscriptionId = ws.client.subscribe(`/topic/chat/room/${chat.roomId}/message`, (data) => events.fire("messageCreated", JSON.parse(data.body)), {[csrfHeader]: csrfToken});
        setWs({...ws, subscription: subscriptionId});

    }
    
    events.unlisten("messageCreated", messageCreatedId);
    messageCreatedId = events.listen("messageCreated", (data) => setMessagesState([...messagesState.filter(message=>message.id != data.id), data]));
    return (
        <section className="chat">
            <ChatHeader chatHeader={chat.chatHeader} />
            <MessageList messages={messagesState} />
            <SendForm {...{send}}/>
        </section>
    )
}