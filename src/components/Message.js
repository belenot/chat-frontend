import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import React from 'react';

export const Message = ({message}) => (
    <React.Fragment>
        <Row style={{flexWrap: "nowrap"}}>
            <Col style={{flex: "auto", maxWidth: "fit-content"}}>
                <Badge variant="primary" className="message-username">{message.login}:</Badge>
            </Col>
            <Col style={{flex: "1"}} className="message-text">
                {message.text}
            </Col>
        </Row>
        <Row style={{justifyContent: "flex-start"}}>
            <Col>
                <Badge pill variant="secondary" className="message-time">{message.time}</Badge>
            </Col>
        </Row>
    </React.Fragment>
)