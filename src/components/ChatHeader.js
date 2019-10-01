import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export const ChatHeader = ({title, dispatch}) => {
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
                        
                        <Button size="sm" className="nav-btn">showClients</Button>
                    </ButtonGroup>
                    </Col>
                </Row>
            </Col>
            
            </React.Fragment>
    )
}