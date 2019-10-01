import {Room} from './Room';

export const RoomList = ({rooms=[], onRoomClick=f=>f}) => (
    <div className="room-list">
        {rooms.map(room => <Room key={room.id} {...{room, onRoomClick: ()=>onRoomClick(room.id)}} />)}
    </div>
)