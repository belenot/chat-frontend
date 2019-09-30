import { ChatHeader } from "./ChatHeader"
import { MessageList } from "./MessageList"
import { SendMessageForm } from "./SendMessageForm"
import {useState, useEffect, useRef} from 'react';
import Stomp from 'stompjs';
import React from 'react';
import { JoinRoomForm } from "./JoinRoomForm";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useChat } from "../hooks/useChat";

export const Chat = ({apiActions, wsEventActions, dispatcher, wsClient=Stomp.over(null)}) => {
    let [chat, chatActions] = useChat(dispatcher, apiActions, wsEventActions, wsClient);
    useEffect(()=> {
        chatActions.call("setLogin", document.querySelector("meta[name='login']").content);
    }, [])
    const setMessagesListRef = (ref) => messagesListRef = ref;
    const {sendMessageForm} = chat;
    return (
        <React.Fragment>
            {chat.room.id?//loaded?
            chat.room.joined?//joined?
                <React.Fragment>
                    <Row className="chat-header" style={{height: "10%", alignContent: "center"}}>
                        <ChatHeader {...{title: chat.room.title, chatActions}}/>
                    </Row>
                    <Row style={{height: "80%"}}>
                        <Col className="message-list" /*ref={s=>setMessagesListRef(s)}*/>
                            <MessageList {...{messages: chat.messages, login: chat.client.login, chatActions}} />
                        </Col>
                    </Row>
                    <Row style={{height: "10%"}}>
                        <Col xs="12">
                            <SendMessageForm {...{text:sendMessageForm.text, chatActions}}/>
                        </Col> 
                    </Row> 
                </React.Fragment>
            :
            <Row style={{height: "100%"}}>
                <Col style={{display: "flex", justifyContent: "center"}}>
                    <JoinRoomForm {...{title: chat.room.title, chatActions}}/>
                </Col>
            </Row>
            :null}
        </React.Fragment>
    )
}