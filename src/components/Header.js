import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Card from "react-bootstrap/Card";
import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {AppContext} from './ReactApp';

export const Header = () =>  {
    const onLogout = () => {
        logout();
        window.location.href="/";
    }
    return (
        <AppContext.Consumer>
            {value=> (
                <React.Fragment>
                    <Col xs="3" style={{alignSelf: "center"}}>
                        <Button className="nav-btn header-settings-btn">&#9881;</Button>
                        <Badge variant="secondary" className="header-login-badge">{value.state.login} </Badge>
                    </Col>
                    <Col xs style={{alignSelf: "center"}}>
                        <Button className="nav-btn" /*onClick={onLogout}*/>logout</Button>
                    </Col>
                </React.Fragment>
            )}
        </AppContext.Consumer>
    )
}