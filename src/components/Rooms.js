import {SearchRoomForm} from './SearchRoomForm';
import {RoomList} from './RoomList';
import {useState} from 'react';
import {useEffect} from 'react';
import { CreateRoomFormDialog } from './CreateRoomFormDialog';
import { FloatWindow } from './FloatWindow';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import React from 'react';

export const Rooms = ({api, events}) => {
    let [joinedRooms, setJoinedRooms] = useState(()=>api.getJoinedRooms((data)=>setJoinedRooms(JSON.parse(data))));
    let [moderatedRooms, setModeratedRooms] = useState(()=>api.getModeratedRooms((data)=>setModeratedRooms(JSON.parse(data))));
    let [searchedRoom, setSearchedRoom] = useState();
    let [formDialogDisplayed, setFormDialogDisplayed] = useState(false);

    useEffect(()=>{
        let joinedRoomSubscription = events.listen("joinedRoom", (room)=>{
            if (room.joined) setJoinedRooms([...joinedRooms, room])
        });
        return () => {
            events.unlisten("joinedRoom", joinedRoomSubscription);
        }
    })

    const createRoom = (title, password) => {
        api.createRoom(title, password, (data) => setModeratedRooms([...moderatedRooms, JSON.parse(data)]));
    }
    const searchRoom = (title) => {
        if (title) {
            api.searchRoom(title, (data) => setSearchedRoom([JSON.parse(data)]));
        } else {
            setSearchedRoom(undefined);
        }
    }
    const loadRoom = (id) => {
        api.loadRoom(id, (data) => events.fire("loadedRoom", JSON.parse(data)))
    }

    return (
        <React.Fragment>
            <Row>
                <Accordion style={{padding: "15px", width: "100%"}}>
                    <Accordion.Toggle as={Button} eventKey="0" className="rooms-accordion-toggle">
                        Add room
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0" className="rooms-accordion-collapse">
                        <CreateRoomFormDialog {...{createRoom}} close={()=>setFormDialogDisplayed(false)}/>
                    </Accordion.Collapse>
                </Accordion>
            </Row>
            <hr />
            <Row as={SearchRoomForm} {...{searchRoom}} />
            <hr />
            <Accordion defaultActiveKey="0" style={{ overflowY:"scroll", maxHeight: "40%"}}>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0" style={{cursor: "pointer"}}>
                        <Badge>Joined</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: searchedRoom || joinedRooms, loadRoom}} />
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor: "pointer"}}>
                        <Badge>Moderated</Badge>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <RoomList style={{maxHeight: "40%", overflowY: "hidden"}} {...{rooms: moderatedRooms, loadRoom}}/>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </React.Fragment>
    )
}