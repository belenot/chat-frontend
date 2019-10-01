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
    useEffect(function(){ //hook for effect action
        switch(state._effect.type) {
            case 'joinRoom': {
                api.joinRoom(
                    {id: state.chat.room.id, ...state._effect.payload},
                    room => dispatch({type: 'joinRoom_success', payload: {room: JSON.parse(room)}}),
                    error => dispatch({type: 'joinRoom_error', payload: {error}})
                )
                break;
            }
            case 'sendMessage': {
                api.sendMessage(state._effect.payload);
                break;
            }
            case 'leaveRoom': {
                api.leaveRoom({id: state.chat.room.id});
                dispatch({type: 'leaveRoom'});
            }
        }
    }, [state._effect])
    useEffect(function(){ // hook for clearing up after changing room
        var subscription;
        const {room} = chat
        if (room && room.joined && !room.banned && room.id) {// subscribe and load first message page
            subscription = ws.client.subscribe("/topic/room/"+room.id, WebSocketEventHandler(dispatch))
            api.getMessagePage(
                {roomId: room.id, page: 0, offset: 0},
                messages => dispatch({
                    type: "getMessagePage_success", 
                    payload: {
                        messages: JSON.parse(messages).sort((a,b)=>a.id - b.id)
                    }
                }),
                error => dispatch({type: "getMessagePage_error", payload: {error}})
            )
        }
        return function(){
            if (subscription) {
                subscription.unsubscribe();            
            }
        }
    }, [chat.room])
    // messageList div control
    const messageListCol = useRef();
    const prevMessageListState = useRef({page: 0, offset: 0, scrollHeight: 0, scrollTop: 0})
    useEffect(function() {// hook for messageList div control. Very complex, if there something will broken, I would rewrite whole function again
        const {page, offset, scrollHeight, scrollTop} = prevMessageListState.current;
        if (chat.room && chat.room.id && messageListCol.current) {
            if (chat.pageOffset > offset) {
                if  (scrollHeight - scrollTop - messageListCol.current.clientHeight < 200) {
                    messageListCol.current.scrollTop = messageListCol.current.scrollHeight - messageListCol.current.clientHeight;//scrollDown on message if client scrolled not much
                }
            }
            if (chat.pageCount == 1) {
                messageListCol.current.scrollTop = messageListCol.current.scrollHeight - messageListCol.current.clientHeight;//scrollDown on init room page
            } else if (page && page < chat.pageCount) {
                messageListCol.current.scrollTop = messageListCol.current.scrollHeight - scrollHeight;
            }
            messageListCol.current.onscroll = function() {
                if (messageListCol.current.scrollTop == 0) {
                    api.getMessagePage(
                        {roomId: chat.room.id, page: chat.pageCount, offset: chat.pageOffset},
                        messages=>dispatch({
                            type: "getMessagePage_success",
                            payload: {messages: JSON.parse(messages).sort((a,b)=>a.id-b.id)}
                        }),
                        error => dispatch({type: "getMessagePage_error", payload:{error}})
                    )
                }
            }
        }
        if (messageListCol.current) {
            prevMessageListState.current = {
                page: chat.pageCount,
                offset: chat.pageOffset,
                scrollHeight: messageListCol.current.scrollHeight,
                scrollTop: messageListCol.current.scrollTop
            }
        }
    })
    const onJoinRoomFormSubmit = function({password}) {
        dispatch({type: 'onJoinRoomFormSubmit', payload: {password}});
    }
    return (
        <React.Fragment>
            {chat.room.id?//loaded?
            chat.room.joined?//joined?
                <React.Fragment>
                    <Row className="chat-header" style={{height: "10%", alignContent: "center"}}>
                        <ChatHeader {...{title: chat.room.title, dispatch}}/>
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