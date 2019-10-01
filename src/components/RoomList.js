import {Room} from './Room';

export const RoomList = ({rooms=[], roomsActions}) => (
    <div className="room-list">
        {rooms.map(room => <Room key={room.id} room={room} /*loadRoom={roomsActions.bake("onRoomClick", {id: room.id})}*//>)}
    </div>
)