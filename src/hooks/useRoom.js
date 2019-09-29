import {Actions} from '../Actions';
import {useState} from 'react'

const initRoomsState = {
    joinedRooms: [],
    moderatedRooms: [],
    searchedRooms: [],
    createRoomForm: {activeKey: undefined}
}

export const useRooms = (dispatcher={yel: f=>f, reg: f=>f}) => {
    const [rooms, setRooms] = useState(initRoomsState);
    const dispatch = (event, payload) => {
        switch (event) {
            case "toggleCreateRoomForm": {
                setRooms({...rooms, createRoomForm: {activeKey: !rooms.createRoomForm.activeKey?"0":null}})
            }
        }
    }
    const dispatchId = dispatcher.reg(dispatch);
    const roomsFunctions = {
        toggleCreateRoomForm: ({}, yelOk=f=>f) => {
            yelOk();
        }
    }
    return [rooms, Actions(roomsFunctions, dispatcher, "roomsActions"), dispatchId]
}