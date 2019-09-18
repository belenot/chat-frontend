import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendForm } from "./SendForm"
import {useState} from 'react';
import {useEffect} from 'react';
import Stomp from 'stompjs';
import React from 'react';
import { JoinRoom } from "./JoinRoom";

export const Chat = ({api, events, wsClient=Stomp.over(null)}) => {
    let [chatState, setChatState] = useState({
        room: {id: undefined, title: undefined, joined: undefined},
        client: {login: document.querySelector("meta[name='login']").content},
        messages: [],
        ws: {client: wsClient, subscription: false},
        pageCount: 0,
        prevRoom: null
    })
    const reloadRoom = (anotherRoom={id:undefined,title:undefined,joined:undefined}) => {
        if (anotherRoom.id != chatState.room.id || !chatState.room.joined && anotherRoom.joined) { // room is another, or same room became joined
            if (chatState.ws.subscription) {
                chatState.ws.client.unsubscribe(chatState.ws.subscription);
                chatState.ws.subscription=false;
            }
            if (anotherRoom.joined) {
                let csrfToken=document.querySelector("meta[name='csrf-token']").content;
                let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
                chatState.ws.subscription = chatState.ws.client.subscribe(`/topic/chat/room/${anotherRoom.id}/message`, (data) => events.fire("messageCreated", JSON.parse(data.body)), {[csrfHeader]: csrfToken});
                api.getMessagePage(anotherRoom.id, 0, messages=>{
                    setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room, messages: [...JSON.parse(messages).sort((a,b)=>a.id-b.id)], pageCount: 1, ws: chatState.ws})
                });
            }
            setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room, messages: [], pageCount: 0, ws: chatState.ws});        
        } else {
            setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room});
        }
    }

    useEffect(()=>{
        let messageCreatedId = events.listen("messageCreated", (messages) => setChatState({...chatState, messages: [...chatState.messages, messages]}));
        let loadedRoomSubscriptionId = events.listen("loadedRoom", ({room, joined}) => reloadRoom({id: room.id, title: room.title, joined}));
        let joinedRoomSubscriptionId = events.listen("joinedRoom", ({id, title, joined}) => reloadRoom({id, title, joined}));
        return () => {
            events.unlisten("messageCreated", messageCreatedId);
            events.unlisten("loadedRoom", loadedRoomSubscriptionId);
            events.unlisten("joinedRoom", joinedRoomSubscriptionId)
        }
    })
    const send = (text) => {
        api.sendMessage(chatState.ws.client, chatState.room.id, text);
    }
    const join = (password) => {
        api.join(chatState.room.id, password, (data) => events.fire("joinedRoom", {...chatState.room, joined: data==='true'}));
    }
    const getPrevMessages = () => {
        api.getMessagePage(chatState.room.id, chatState.pageCount, messages=>{
            setChatState({...chatState, messages: [...JSON.parse(messages).sort((a,b)=>a.id-b.id), ...chatState.messages], pageCount: chatState.pageCount + 1});
        });
    }
    const scrollDown = chatState.pageCount <= 1 && chatState.prevRoom && (chatState.room.id != chatState.prevRoom.id || chatState.room.joined && !chatState.prevRoom.joined);
    return (
        <section className="chat">
            {chatState.room.id?//loaded?
            chatState.room.joined?//joined?
            <React.Fragment>
                <ChatHeader title={chatState.room.title} />
                <MessageList {...{messages: chatState.messages, login: chatState.client.login, getPrevMessages, scrollDown}} />
                <SendForm send={send}/>
            </React.Fragment>
            :<JoinRoom {...{title: chatState.room.title, join}}/>
            :null}
        </section>
    )
}