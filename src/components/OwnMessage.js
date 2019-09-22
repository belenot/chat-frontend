import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

export const OwnMessage = ({message}) => (
    <React.Fragment>
        <Row style={{flexWrap: "nowrap"}}>
            <Col style={{flex: "1"}} className="message-text">
                {message.text}
            </Col>
        </Row>
        <Row style={{justifyContent: "flex-end"}}>
        <Col>
                <Badge pill variant="secondary" className="message-time">{message.time}</Badge>
            </Col>
        </Row>
    </React.Fragment>
)