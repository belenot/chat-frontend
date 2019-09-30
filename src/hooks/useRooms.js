import {Actions} from '../Actions';
import {useState, useRef, useEffect} from 'react'

const initRoomsState = {
    joinedRooms: [],
    moderatedRooms: [],
    joinedInited: false,
    moderatedInited: false,
    searchedRooms: [],
    createRoomForm: {activeKey: '', error: undefined},
    searchRoomsForm: {
        title: '',
        error: ''
    },
    roomsGroups: {
        activeKey: 'joinedRooms'
    }
}

export const useRooms = (dispatcher={yel: f=>f, reg: f=>f}, apiActions={call:f=>f, cook:f=>f}) => {
    const [rooms, setRooms] = useState(initRoomsState);
    const dispatch = (event, payload) => {
        const {status, data, error} = payload;
        switch (event) {
            case "toggleCreateRoomForm": {
                setRooms({...rooms, createRoomForm: {...rooms.createRoomForm, activeKey: !rooms.createRoomForm.activeKey?"0":'', error: ''}});
                break;
            }
            case "onSearchRoomsFormType": {
                if (status == 'ok') {
                    if (data.title) {
                        setRooms({...rooms, searchRoomsForm: {...rooms.searchRoomsForm, title: data.title, error: ''}})
                    } else {
                        setRooms({...rooms, 
                                    searchRoomsForm: {...rooms.searchRoomsForm, title: data.title, error: ''},
                                    searchedRooms: []})
                    }
                }
                break;
            }
            case "setActiveRoomsGroup": {
                if (data.activeKey != rooms.roomsGroups.activeKey) {
                    setRooms({...rooms, roomsGroups: {...rooms.roomsGroups, activeKey: data.activeKey}})
                } else {
                    setRooms({...rooms, roomsGroups: {...rooms.roomsGroups, activeKey: ""}})
                }
                break;
            }
            case "createRoom": {
                if (status=='ok') {
                    setRooms({...rooms, 
                                moderatedRooms: [...rooms.moderatedRooms, {...data}],
                                roomsGroups: {...rooms.roomsGroups, activeKey: "moderatedRooms"},
                                createRoomForm: {...rooms.createRoomForm, activeKey: '', error: ''}});
                } else if (status =='err') {
                    setRooms({...rooms, createRoomForm: {...rooms.createRoomForm, error}});
                }
                break;
            }
            case "searchRooms": {
                if (status == 'ok') {
                    setRooms({...rooms, 
                                searchedRooms: data.length?[...data]:[], 
                                searchRoomsForm: {...rooms.searchRoomsForm, error: ''},
                                roomsGroups: {...rooms.roomsGroups, activeKey: "searchedRooms"}})
                }  else if (status == 'err') {
                    setRooms({...rooms, searchRoomsForm: {...rooms.searchRoomsForm, error}})
                }
                break;
            }
            case "getJoinedRooms": {
                if (status == 'ok') {
                    setRooms({...rooms, joinedRooms: data.length?[...data]:[], joinedInited: true})
                }
                break;
            }
            case "getModeratedRooms": {
                if (status == 'ok') {
                    setRooms({...rooms, moderatedRooms: data.length?[...data]:[], moderatedInited: true});
                }
                break;
            }
            case "loadRoom": {
                if (status == 'ok') {
                    console.log(data);
                } else if (status == 'err') {
                    console.log(error);
                }
            }
        }
    }
    const dispatchIdRef = useRef()
    useEffect(()=> {
        if (dispatchIdRef.current) {
            dispatcher.unreg(dispatchIdRef.current);
        }
        dispatchIdRef.current = dispatcher.reg(dispatch);
    })
    console.log("hook");
    const roomsFunctions = {
        toggleCreateRoomForm: ({}, yelOk=f=>f) => {
            yelOk();
        },
        onSearchRoomsFormType: ({title}, yelOk=f=>f) => {
            yelOk({title})
        },
        onSearchRoomsFormSubmit: ({}, yelOk=f=>f) => {
            apiActions.call("searchRooms", {title: rooms.searchRoomsForm.title})
        },
        onCreateRoomFormSubmit: ({title, password}, yelOk=f=>f) => {
            apiActions.call("createRoom", {title, password})
        },
        setActiveRoomsGroup:({activeKey}, yelOk=f=>f) => {
            yelOk({activeKey});
        },
        onRoomClick: ({id}, yelOk=f=>f) => {
            apiActions.call("loadRoom", {id})
        }
    }
    return [rooms, Actions(roomsFunctions, dispatcher, "roomsActions")]
}