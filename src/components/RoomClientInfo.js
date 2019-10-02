import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from 'react-bootstrap/Button';
import {useContext} from 'react';
import { AppContext } from "./ReactApp";

export const RoomClientInfo = ({client={}, moderated=false}) => {
    let className = "room-client-info " + client.banned?" banned ":'' + client.deleted?" deleted ":'' + client.leaved?' leaved ':'';
    const {dispatch} = useContext(AppContext);
    const onBanBtnClick = function(e) {
        dispatch({type:'onBanBtnClick', payload: {clientId: client.clientId}});
    }
    return (
        <Row>
            <Col>
                <Badge className={className}>{client.login}</Badge>
                {moderated&&<Button onClick={onBanBtnClick}>ban</Button>}
            </Col>
        </Row>
    )
}