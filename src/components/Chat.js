import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendForm } from "./SendForm"
import {useState, useEffect, useRef} from 'react';
import Stomp from 'stompjs';
import React from 'react';
import { JoinRoom } from "./JoinRoom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const Chat = ({api, events, wsClient=Stomp.over(null)}) => {
    let [chatState, setChatState] = useState({
        room: {id: undefined, title: undefined, joined: undefined},
        client: {login: document.querySelector("meta[name='login']").content},
        messages: [],
        ws: {client: wsClient, subscription: false},
        pageCount: 0,
        pageOffset: 0,
        prevRoom: null,
        event: null
    })
    let messagesListRef = undefined;
    let prevMessagesListRef = useRef(null);
    const reloadRoom = (anotherRoom={id:undefined,title:undefined,joined:undefined, event: undefined}) => {
        if (anotherRoom.id != chatState.room.id || !chatState.room.joined && anotherRoom.joined) { // room is another, or same room became joined
            if (chatState.ws.subscription) {
                chatState.ws.client.unsubscribe(chatState.ws.subscription);
                chatState.ws.subscription=false;
            }
            if (anotherRoom.joined) {
                let csrfToken=document.querySelector("meta[name='csrf-token']").content;
                let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
                chatState.ws.subscription = chatState.ws.client.subscribe(`/topic/chat/room/${anotherRoom.id}/message`, (data) => events.fire("messageCreated", JSON.parse(data.body)), {[csrfHeader]: csrfToken});
                api.getMessagePage(anotherRoom.id, 0, 0, messages=>{
                    setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room, messages: [...JSON.parse(messages).sort((a,b)=>a.id-b.id)], pageCount: 1, pageOffset: 0, ws: chatState.ws, event})
                });
            }
            setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room, messages: [], pageCount: 0, pageOffset: 0, ws: chatState.ws, event});
        } else {
            setChatState({...chatState, room: anotherRoom, prevRoom: chatState.room, event});
        }
    }

    useEffect(()=>{
        let messageCreatedId = events.listen("messageCreated", (messages) => setChatState({...chatState, messages: [...chatState.messages, messages], event: 'messageCreated', pageOffset: chatState.pageOffset+1}));
        let loadedRoomSubscriptionId = events.listen("loadedRoom", ({room, joined}) => reloadRoom({id: room.id, title: room.title, joined, event: 'loadedRoom'}));
        let joinedRoomSubscriptionId = events.listen("joinedRoom", ({id, title, joined}) => reloadRoom({id, title, joined, event: 'joinedRoom'}));
        let leavedRoomSubscriptionId = events.listen("leavedRoom", ({id, title}) => {reloadRoom({id, title, joined: false, event: 'leavedRoom'})});
        if (messagesListRef) {
            messagesListRef.onscroll = () => {
                if (messagesListRef && messagesListRef.scrollTop == 0) {
                    console.log("It is the peek");
                    getPrevMessages();
                }
            }
            switch (chatState.event) {
                case 'messageCreated': messagesListRef.scrollTop=messagesListRef.scrollHeight - messagesListRef.clientHeight; break;
                case 'prevMessages':
                    if (prevMessagesListRef.current) {
                        messagesListRef.scrollTop=(messagesListRef.scrollHeight - prevMessagesListRef.current.scrollHeight);
                    }
                    break;
                default: messagesListRef.scrollTop=messagesListRef.scrollHeight - messagesListRef.clientHeight; break;
            }
            prevMessagesListRef.current = {scrollHeight: messagesListRef.scrollHeight, scrollTop: messagesListRef.scrollTop};
        }
        return () => {
            events.unlisten("messageCreated", messageCreatedId);
            events.unlisten("loadedRoom", loadedRoomSubscriptionId);
            events.unlisten("joinedRoom", joinedRoomSubscriptionId);
            events.unlisten("leavedRoom", leavedRoomSubscriptionId);
        }
    })
    const send = (text) => {
        api.sendMessage(chatState.ws.client, chatState.room.id, text);
    }
    const join = (password) => {
        api.join(chatState.room.id, password, (data) => events.fire("joinedRoom", {...chatState.room, joined: data==='true'}));
    }
    const getPrevMessages = () => {
        api.getMessagePage(chatState.room.id, chatState.pageCount, chatState.pageOffset, messages=>{
            setChatState({...chatState, messages: [...JSON.parse(messages).sort((a,b)=>a.id-b.id), ...chatState.messages], pageCount: chatState.pageCount + 1, event:'prevMessages'});
        });
    }
    const leave = () => {
        api.leaveRoom(chatState.room.id, () => events.fire("leavedRoom", {id: chatState.room.id, title: chatState.room.title}));
    }
    const setMessagesListRef = (ref) => messagesListRef = ref;
    return (
        <React.Fragment>
            {chatState.room.id?//loaded?
            chatState.room.joined?//joined?
                <React.Fragment>
                    <Row className="chat-header" style={{height: "10%", alignContent: "center"}}>
                        <ChatHeader title={chatState.room.title} leave={leave}/>
                    </Row>
                    <Row style={{height: "80%"}}>
                        <Col className="message-list" ref={s=>setMessagesListRef(s)}>
                            <MessageList {...{messages: chatState.messages, login: chatState.client.login, getPrevMessages, setMessagesListRef}} />
                        </Col>
                    </Row>
                    <Row style={{height: "10%"}}>
                        <Col xs="12">
                            <SendForm send={send}/>
                        </Col> 
                    </Row> 
                </React.Fragment>
            :
            <Row style={{height: "100%"}}>
                <Col style={{display: "flex", justifyContent: "center"}}>
                    <JoinRoom {...{title: chatState.room.title, join}}/>
                </Col>
            </Row>
            :null}
        </React.Fragment>
    )
}