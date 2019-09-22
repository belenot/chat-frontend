import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";
import {useEffect} from 'react'
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

export const MessageList = ({messages=[], login, setMessagesListRef=f=>f}) => {
    return (
        <React.Fragment>
            {messages.map(message => (
                <Row style={{marginTop:"10px"}}>
                        <Col className="message" xs="8">
                            <Message key={message.id} message={message} />
                        </Col>
                </Row>
            ))}
        </React.Fragment>
    )
}