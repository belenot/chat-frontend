import {Header} from './Header';
import {Rooms} from './Rooms';
import {Chat} from './Chat';
import React, {Fragment} from 'react';
import {useState} from 'react';
import {useEffect} from 'react'
import { JoinRoom } from './JoinRoom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ReactApp = ({login, api, events, wsClient}) => (

    // <Fragment>
    //     <Header login={login} logout={api.logout}/>
    //     <Rooms {...{api, events}} />
    //     <Chat {...{api, events, wsClient}}/>
    // </Fragment>
    <Container  style={{height: "75%", width: "75%"}} fluid>
        <Row className="header" style={{height: "12%", overflowY: "hidden"}}>
            <Header   login={login} logout={api.logout}/>
        </Row>
            
        <Row style={{height: "88%", overflowY: "hidden", boxShadow: "0 0 5px black"}}>
            <Col className="rooms">
                <Rooms xs="3" style={{height: "100%"}} {...{api, events}} />
            </Col> 
            <Col xs="9" style={{height: "100%"}}>
                <Chat {...{api, events, wsClient}}/>
            </Col>
        </Row>
    </Container>
)