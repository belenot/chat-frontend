import Card from "react-bootstrap/Card"
import { RoomClientInfo } from "./RoomClientInfo"

export const RoomClients = ({clients=[], moderated=false}) => (
    <Card className="room-clients-card">
        <Card.Body>
            {clients.map(client=>
                <RoomClientInfo key={client.clientId} {...{client, moderated}} />
            )}
        </Card.Body>
    </Card>
)