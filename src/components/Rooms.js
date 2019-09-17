import {SearchRoomForm} from './SearchRoomForm';
import {RoomList} from './RoomList';
import {useState} from 'react';
import { CreateRoomFormDialog } from './CreateRoomFormDialog';

export const Rooms = ({searchRoom, loadRoom, createRoom, events={}}) => {
    let [roomsState, setRoomsState] = useState(()=>api.getRooms((data)=>setRoomsState(JSON.parse(data))));
    let [searchedRoomState, setSearchedRoomState] = useState();
    let [formDialogDisplayed, setFormDialogDisplayed] = useState(false);
    const onSearchRoomSubmit = (title) => {
        if (title) {
            searchRoom(title, room => setSearchedRoomState([JSON.parse(room)]));
        } else {
            setSearchedRoomState(undefined);
        }
    }
    const onCreateRoomSubmit = (title, password) => {
        createRoom(title, password, (r)=>setRoomsState([...roomsState, JSON.parse(r)]))
        setFormDialogDisplayed(false);
    }
    const onLoadRoom=(id) => {
        loadRoom(id, events.prepare("loaded"));
    }

    return (
        <section className="rooms">
            <button className="add-room-activate" onClick={()=>setFormDialogDisplayed(true)}>add room</button>
            <CreateRoomFormDialog displayed={formDialogDisplayed} createRoom={onCreateRoomSubmit} close={()=>setFormDialogDisplayed(false)}/>
            <SearchRoomForm {...{onSearchRoomSubmit}} />
            <RoomList rooms={searchedRoomState || roomsState} loadRoom={onLoadRoom}/>
        </section>
    )
}