import { OwnMessage } from "./OwnMessage";
import { Message } from "./Message";
import {useEffect, useRef} from 'react'
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React from 'react';

export const MessageList = ({messages=[]}) => {
    return (
        <React.Fragment>
            {messages.map(message => (
                <Row key={message.id} style={{marginTop:"10px"}}>
                        <Col className="message" xs="8">
                            <Message message={message} />
                        </Col>
                </Row>
            ))}
        </React.Fragment>
    )
}