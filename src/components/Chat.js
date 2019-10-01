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
    return function({description, info}) {
        switch(description) {
            default: {
                console.warn("Undefined WebSocket Event " + description)
            }
        }
    }
}

export const Chat = () => {    
    const {state, dispatch} = useContext(AppContext);
    const {chat, ws} = state;
    useEffect(function(){
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
    useEffect(function(){
        var subscription;
        const {room} = chat
        if (room && room.joined && !room.banned && room.id) {// subscribe and load first message page
            subscription = ws.client.subscribe("/topic/room/"+room.id, WebSocketEventHandler(dispatch))
            api.getMessagePage(
                {roomId: room.id, page: 0, offset: 0},
                messages => dispatch({type: "getMessagePage_success", payload: {messages: JSON.parse(messages)}}),
                error => dispatch({type: "getMessagePage_error", payload: {error}})
            )
        }
        return function(){
            if (subscription) {
                subscription.unsubscribe();            
            }
        }
    }, [chat.room])
    const onJoinRoomFormSubmit = function({password}) {
        dispatch({type: 'onJoinRoomFormSubmit', payload: {password}});
    }
    const onSendMessageFormSubmit = function() {
        dispatch({type: 'onSendMessageFormSubmit'});
    }
    const onSendMessageFormType = function({text}) {
        dispatch({type: 'onSendMessageFormType', payload: {text}})
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
                        <Col className="message-list" >
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