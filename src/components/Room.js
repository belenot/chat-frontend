import Card from 'react-bootstrap/Card';

export const Room = ({room, loadRoom=f=>f}) => (
    <Card className="room" onClick={()=>loadRoom()}>
        <Card.Img /*style={{width: "1em", height: "1em"}} *//>
        <Card.Body>{room.title}</Card.Body>
    </Card>
)