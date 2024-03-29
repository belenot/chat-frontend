import {SearchRoomsForm} from './SearchRoomsForm';
import {RoomList} from './RoomList';
import {useState} from 'react';
import {useEffect} from 'react';
import { CreateRoomForm } from './CreateRoomForm';
import { FloatWindow } from './FloatWindow';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React from 'react';
import {useRef, useContext} from 'react';
import { useRooms } from '../hooks/useRooms';
import { AppContext } from './ReactApp';
import { api } from '../api/api';
import { Chat } from './Chat';

export const Rooms = (/*{apiActions, dispatcher}*/) => {
    const {state, dispatch} = useContext(AppContext);
    const {rooms} = state;
    useEffect(()=> {
        api.getJoinedRooms()
            .then((joinedRooms)=>dispatch({type:'getJoinedRooms_success', payload:{joinedRooms}}))
            .then(()=>api.getModeratedRooms())
            .then((moderatedRooms)=>dispatch({type:'getModeratedRooms_success', payload:{moderatedRooms}}));
    }, [])
    useEffect(() => {
        switch (state._effect.type) {
            case 'loadRoom': {
                api.loadRoom(state._effect.payload)
                    .then(room=>dispatch({type: 'loadRoom_success', payload: {room}}))
                    .catch(error=>dispatch({type: 'loadRoom_error', payload: {error:error.message}}))
            }
        }
    }, [state._effect])
    const onRoomClick = function(id) {
        id != state.chat.room.id && dispatch({type: "onRoomClick", payload: {id}})
    };
    return (
            <React.Fragment>
                <Row>
                    <Accordion defaultActiveKey={null} activeKey={rooms.createRoomForm.activeKey} style={{padding: "15px", width: "100%"}}>
                        <Accordion.Toggle onClick={()=>dispatch({type: "onToggleCreateRoomForm"})} as={Button} eventKey="createRoomForm" className="rooms-accordion-toggle">
                            Add room
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="createRoomForm" className="rooms-accordion-collapse">
                            <CreateRoomForm />
                        </Accordion.Collapse>
                    </Accordion>
                </Row>
                <hr />
                <Row as={SearchRoomsForm} />
                <hr />
                
                <Accordion activeKey={rooms.roomsGroups.activeKey} style={{ overflowY:"scroll", maxHeight: "40%"}}>
                    {rooms.searchedRooms.length?
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="searchedRooms" style={{cursor: "pointer"}} onClick={()=>dispatch({type:"onRoomsAccordionToggle", payload: {activeKey: "searchedRooms"}})}>
                                <Badge>Searched</Badge>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="searchedRooms">
                                <Card.Body>
                                    <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: rooms.searchedRooms, onRoomClick}} />
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    :undefined}
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="joinedRooms" style={{cursor: "pointer"}} onClick={()=>dispatch({type:"onRoomsAccordionToggle", payload: {activeKey: "joinedRooms"}})}>
                            <Badge>Joined</Badge>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="joinedRooms">
                            <Card.Body>
                                <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: rooms.joinedRooms, onRoomClick}} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="moderatedRooms" style={{cursor: "pointer"}} onClick={()=>dispatch({type:"onRoomsAccordionToggle", payload: {activeKey: "moderatedRooms"}})}>
                            <Badge>Moderated</Badge>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="moderatedRooms">
                            <Card.Body>
                                <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: rooms.moderatedRooms, onRoomClick}}/>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </React.Fragment>
    )
}