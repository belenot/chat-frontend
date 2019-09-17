import {SearchRoomForm} from './SearchRoomForm';
import {RoomList} from './RoomList';
import {useState} from 'react';
import {useEffect} from 'react';
import { CreateRoomFormDialog } from './CreateRoomFormDialog';

export const Rooms = ({api, events}) => {
    let [joinedRooms, setJoinedRooms] = useState(()=>api.getJoinedRooms((data)=>setJoinedRooms(JSON.parse(data))));
    let [moderatedRooms, setModeratedRooms] = useState(()=>api.getModeratedRooms((data)=>setModeratedRooms(JSON.parse(data))));
    let [searchedRoom, setSearchedRoom] = useState();
    let [formDialogDisplayed, setFormDialogDisplayed] = useState(false);

    useEffect(()=>{
        let joinedRoomSubscription = events.listen("joinedRoom", (room)=>{
            if (room.joined) setJoinedRooms([...joinedRooms, room])
        });
        return () => {
            events.unlisten("joinedRoom", joinedRoomSubscription);
        }
    })

    const createRoom = (title, password) => {
        api.createRoom(title, password, (data) => setModeratedRooms([...moderatedRooms, JSON.parse(data)]));
    }
    const searchRoom = (title) => {
        if (title) {
            api.searchRoom(title, (data) => setSearchedRoom([JSON.parse(data)]));
        } else {
            setSearchedRoom(undefined);
        }
    }
    const loadRoom = (id) => {
        api.loadRoom(id, (data) => events.fire("loadedRoom", JSON.parse(data)))
    }

    return (
        <section className="rooms">
            <button className="add-room-activate" onClick={()=>setFormDialogDisplayed(true)}>add room</button>
            {formDialogDisplayed?<CreateRoomFormDialog {...{createRoom}} close={()=>setFormDialogDisplayed(false)}/>:null}
            <SearchRoomForm {...{searchRoom}} />
            joined<br />
            <RoomList {...{rooms: searchedRoom || joinedRooms, loadRoom}}/>
            moderated<br />
            <RoomList {...{rooms: moderatedRooms, loadRoom}}/>
        </section>
    )
}