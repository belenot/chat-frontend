import {Room} from './Room';

export const RoomList = ({rooms=[], loadRoom=f=>f}) => (
    <div className="room-list">
        {rooms.map(room => <Room key={room.id} room={room} loadRoom={()=>loadRoom(room.id)}/>)}
    </div>
)