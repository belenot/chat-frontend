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
import {useRef} from 'react';
import { useRooms } from '../hooks/useRooms';

export const Rooms = ({apiActions, dispatcher}) => {
    let [rooms, roomsActions] = useRooms(dispatcher, apiActions);
    useEffect(()=> {
        if (!rooms.joinedInited) {
            apiActions.call("getJoinedRooms");        
        } else {
            apiActions.call("getModeratedRooms");
        }
    }, [rooms.joinedInited])
    const loadRoom = (id) => {
        // api.loadRoom(id, (data) => events.fire("loadedRoom", JSON.parse(data)))
    }
    const {createRoomForm, searchRoomsForm, searchedRooms, joinedRooms, moderatedRooms, roomsGroups} = rooms;
    const {cook, bake} = roomsActions;
    return (
        <React.Fragment>
            <Row>
                <Accordion defaultActiveKey={null} activeKey={createRoomForm.activeKey} style={{padding: "15px", width: "100%"}}>
                    <Accordion.Toggle onClick={bake("toggleCreateRoomForm")} as={Button} eventKey="0" className="rooms-accordion-toggle">
                        Add room
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" className="rooms-accordion-collapse">
                        <CreateRoomForm {...{roomsActions, error: createRoomForm.error}}/>
                    </Accordion.Collapse>
                </Accordion>
            </Row>
            <hr />
            <Row as={SearchRoomsForm} {...{...searchRoomsForm, roomsActions}} />
            <hr />
            <Accordion activeKey={roomsGroups.activeKey} style={{ overflowY:"scroll", maxHeight: "40%"}}>
                {searchedRooms.length?
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="searchedRooms" style={{cursor: "pointer"}} onClick={roomsActions.bake("setActiveRoomsGroup", {activeKey: "searchedRooms"})}>
                            <Badge>Searched</Badge>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="searchedRooms">
                            <Card.Body>
                                <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: searchedRooms, roomsActions}} />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                :undefined}
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="joinedRooms" style={{cursor: "pointer"}} onClick={roomsActions.bake("setActiveRoomsGroup", {activeKey: "joinedRooms"})}>
                        <Badge>Joined</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="joinedRooms">
                        <Card.Body>
                            <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: joinedRooms, roomsActions}} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="moderatedRooms" style={{cursor: "pointer"}} onClick={roomsActions.bake("setActiveRoomsGroup", {activeKey: "moderatedRooms"})}>
                        <Badge>Moderated</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="moderatedRooms">
                        <Card.Body>
                            <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: moderatedRooms, roomsActions}}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </React.Fragment>
    )
}