import Card from 'react-bootstrap/Card';

export const Room = ({room, onRoomClick}) => (
    <Card className="room" onClick={onRoomClick}>
        <Card.Img /*style={{width: "1em", height: "1em"}} *//>
        <Card.Body>{room.title}</Card.Body>
    </Card>
)