import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendMessageForm } from "./SendMessageForm"
import {useState, useEffect, useRef, useContext} from 'react';
import Stomp from 'stompjs';
import React from 'react';
import { JoinRoomForm } from "./JoinRoomForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useChat } from "../hooks/useChat";
import {AppContext} from './ReactApp';
import { Actions } from "../Actions";
import { api } from "../api/api";

export function WebSocketEventHandler(dispatch=f=>f) {
    return function(frame) {
        // switch(description) {
        //     default: {
        //         console.warn("Undefined WebSocket Event " + description)
        //     }
        const {description, info} = JSON.parse(frame.body);
        dispatch({type: description, payload: {...info}})
    }
}

export const Chat = () => {    
    const {state, dispatch} = useContext(AppContext);
    const {chat, ws} = state;
    const messageListCol = useRef();
    // const prevMessageListState = useRef({page: 0, offset: 0, scrollHeight: 0, scrollTop: 0})
    // const messagesLength = useRef(0);
    useEffect(function(){ //hook for effect action
        switch(state._effect.type) {
            case 'joinRoom': {
                api.joinRoom({id: state.chat.room.id, ...state._effect.payload})
                    .then(room => dispatch({type: 'joinRoom_success', payload: {room}}))
                    .catch(error => dispatch({type: 'joinRoom_error', payload: {error: error.message}}))
                break;
            }
            case 'sendMessage': {
                api.sendMessage(state._effect.payload);
                break;
            }
            case 'leaveRoom': {
                api.leaveRoom({id: state.chat.room.id});
                dispatch({type: 'leaveRoom'});
                break;
            }
            case 'getMessagePage': {
                api.getMessagePage({...state._effect.payload})
                        .then(messages=>dispatch({type: "getMessagePage_success",payload: {messages: messages.sort((a,b)=>a.id-b.id)}}))
                        .catch(error => dispatch({type: "getMessagePage_error", payload:{error:error.message}}))
                break;
            }
            case 'ban': {
                api.ban({...state._effect.payload})
                break;
            }
            case 'initRoom': {
                api.getMessagePage({...state._effect.payload, page: 0, offset: 0})
                        .then(messages=>dispatch({type: "getMessagePage_success",payload: {messages: messages.sort((a,b)=>a.id-b.id)}}))
                        .catch(error => dispatch({type: "getMessagePage_error", payload:{error:error.message}}))
                        .then(()=>api.getClients({id: state._effect.payload.roomId}))
                        .then(clients=>dispatch({type: "getClients_success", payload: {clients}}))
                        .catch(error=>dispatch({type: "getClients_error", payload: {error: error.message}}))
            }
        }
    }, [state._effect])
    useEffect(function(){ // hook for clearing up after changing room
        var subscription;
        const {room} = chat
        if (room && room.joined && !room.banned && room.id) {// subscribe and load first message page
            subscription = ws.client.subscribe("/topic/room/"+room.id, WebSocketEventHandler(dispatch))
            dispatch({type:'onRoomChange'})
        }
        return function(){
            if (subscription) {
                subscription.unsubscribe();            
            }
        }
    }, [chat.room])
    const messagePage = useRef({offset: 0, count: 0})
    useEffect(function(){
        if (messageListCol.current) {
            const {scrollHeight, scrollTop, clientHeight} = messageListCol.current;
            if (scrollHeight - scrollTop - clientHeight < 200) {
                messageListCol.current.scrollTop = scrollHeight - clientHeight;
            }
        }
    }, [chat.pageOffset])
    const scrollHeight = useRef(0);
    useEffect(function() {
        if (messageListCol.current) {
            if (chat.pageCount > 0 && scrollHeight.current){
                messageListCol.current.scrollTop = messageListCol.current.scrollHeight - scrollHeight.current;
            } else if (chat.pageCount == 1) {
                messageListCol.current.scrollTop = messageListCol.current.scrollHeight - messageListCol.current.clientHeight;
            }
            scrollHeight.current = messageListCol.current.scrollHeight;
        }
    }, [chat.pageCount])
    useEffect(()=>{
        if(messageListCol.current) {
            messageListCol.current.onscroll = function() {
                if (messageListCol.current.scrollTop == 0 && chat.messages.length) {
                    dispatch({type:'onMessageListScrollTop'})
                }
            }
        }
        return () => {if (messageListCol.current) messageListCol.current.onscroll = null;}
    }, [chat.room, chat.messages])
    const onJoinRoomFormSubmit = function({password}) {
        dispatch({type: 'onJoinRoomFormSubmit', payload: {password}});
    }
    const moderated = chat.room && [...state.rooms.moderatedRooms].some(room=>room.id == chat.room.id);
    return (
        <React.Fragment>
            {chat.room.id?//loaded?
            chat.room.joined?//joined?
                <React.Fragment>
                    <Row className="chat-header" style={{height: "10%", alignContent: "center"}}>
                        <ChatHeader {...{title: chat.room.title, clients: chat.clients, moderated, dispatch}}/>
                    </Row>
                    <Row style={{height: "80%"}}>
                        <Col className="message-list" ref={col=>messageListCol.current = col}>
                            <MessageList {...{messages: chat.messages, login: state.login}} />
                        </Col>
                    </Row>
                    <Row style={{height: "10%"}}>
                        <Col xs="12">
                            <SendMessageForm {...{text: chat.sendMessageForm.text, dispatch}}/>
                        </Col> 
                    </Row> 
                </React.Fragment>
            :
            <Row style={{height: "100%"}}>
                <Col style={{display: "flex", justifyContent: "center"}}>
                    <JoinRoomForm {...{title: chat.room.title, error: chat.joinRoomForm.error, onJoinRoomFormSubmit}}/>
                </Col>
            </Row>
            :null}
        </React.Fragment>
    )
}