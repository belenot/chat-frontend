import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendForm } from "./SendForm"
import {useState} from 'react';
import {useEffect} from 'react';
import Stomp from 'stompjs';
import React from 'react';
import { JoinRoom } from "./JoinRoom";

export const Chat = ({api, events, wsClient=Stomp.over(null)}) => {
    let [room, setRoom] = useState({});
    let [client, setClient] = useState({login: document.querySelector("meta[name='login']").content});
    let [messages, setMessages] = useState([]);
    let [ws, setWs] = useState({client: wsClient, subscription: false});
    const reloadRoom = (anotherRoom) => {
        if (anotherRoom.id != room.id) {
            setRoom(anotherRoom);
            setMessages([]);
            if (ws.subscription) {
                ws.client.unsubscribe(ws.subscription);
                ws.subscription=false;
                setWs(ws);
            }
        }

    }
    useEffect(()=>{
        let messageCreatedId = events.listen("messageCreated", (data) => setMessages([...messages.filter(message=>message.id != data.id), data]));
        let loadedRoomId = events.listen("loadedRoom", (data) => reloadRoom({id: data.room.id, title: data.room.title, joined: data.joined}));
        let joinedRoomId = events.listen("joinedRoom", (data) => setRoom({...room, ...data}));
        return () => {
            events.unlisten("messageCreated", messageCreatedId);
            events.unlisten("loadedRoom", loadedRoomId);
            events.unlisten("joinedRoom", joinedRoomId)
        }
    })
    if (!ws.subscription && room.id && room.joined) {
        let csrfToken=document.querySelector("meta[name='csrf-token']").content;
        let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
        let subscriptionId = ws.client.subscribe(`/topic/chat/room/${room.id}/message`, (data) => events.fire("messageCreated", JSON.parse(data.body)), {[csrfHeader]: csrfToken});
        setWs({...ws, subscription: subscriptionId});
    }
    const send = (text) => {
        api.sendMessage(wsClient, room.id, text);
    }
    const join = (password) => {
        api.join(room.id, password, (data) => events.fire("joinedRoom", {...room, joined: data==='true'}));
    }
    return (
        <section className="chat">
            {room.id?
            room.joined?
            <React.Fragment>
                <ChatHeader title={room.title} />
                <MessageList {...{messages, login: client.login}} />
                <SendForm send={send}/>
            </React.Fragment>
            :<JoinRoom {...{title: room.title, join}}/>
            :null}
        </section>
    )
}