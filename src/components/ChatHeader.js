import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Accordion from 'react-bootstrap/Accordion';
import { RoomClients } from './RoomClients';

export const ChatHeader = ({title, clients=[], moderated=false, dispatch}) => {
    function onLeaveBtnClick() {
        dispatch({type:'onLeaveBtnClick'})
    }
    return(
        <React.Fragment>
            <Col xs="8" as="h3" style={{textAlign: "center"}}>
                <Badge variant="secondary" className="room-title-badge">
                    {title}
                </Badge>
            </Col>
            <Col xs="4">
                <Row>
                    <Col>
                    <ButtonGroup>
                        <Button size="sm" className="nav-btn" onClick={onLeaveBtnClick}>leave</Button>
                        
                        <Accordion className="room-clients-card">
                            <Accordion.Toggle eventKey="roomClientsCard" className="nav-btn" as={Button}>Clients</Accordion.Toggle>
                            <Accordion.Collapse eventKey="roomClientsCard" style={{position: "absolute", zIndex:"1"}}>
                                <RoomClients {...{clients, moderated}} />
                            </Accordion.Collapse>
                        </Accordion>
                    </ButtonGroup>
                    </Col>
                </Row>
            </Col>
            
            </React.Fragment>
    )
}