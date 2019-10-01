import {Header} from './Header';
import {Rooms} from './Rooms';
import {Chat} from './Chat';
import React, {Fragment} from 'react';
import {useState} from 'react';
import {useEffect} from 'react'
import { JoinRoom } from './JoinRoomForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {useReducer, createContext} from 'react';
import { api } from '../api/api';
import { Dispatcher } from '../Dispatcher';

const dispatcher = Dispatcher();

export const initState = {
    login: '',
    rooms: {
        joinedRooms: [],
        moderatedRooms: [],
        _joinedInited: false,
        _moderatedInited: false,
        searchedRooms: [],
        createRoomForm: {activeKey: '', error: undefined},
        searchRoomsForm: {
            title: '',
            error: ''
        },
        roomsGroups: {
            activeKey: 'joinedRooms'
        }
    },
    chat: {
        show: false,
        room: {id: undefined, title: undefined, banned: undefined, joined: undefined},
        messages: [],
        ws: {client: null, subscription: ''},
        pageCount: 0,
        pageOffset: 0,
        prevRoom: null,
        sendMessageForm: {
            text: ''
        }
    },
    _effect: {type:'', payload: null}
}

function stateReducer(state, action) {
    switch(action.type) {
        case 'getJoinedRooms_success': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    joinedRooms: [...action.payload.joinedRooms]
                }
            }
        }
        case 'getModeratedRooms_success': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    moderatedRooms: [...action.payload.moderatedRooms]
                }
            }
        }
        case 'onToggleCreateRoomForm': {
            return {
                ...state, 
                rooms: {
                    ...state.rooms, 
                    createRoomForm: {
                        ...state.rooms.createRoomForm, 
                        activeKey: state.rooms.createRoomForm.activeKey != 'createRoomForm'?'createRoomForm': '0',
                        error: ''
                    }
                }
            }
        }
        case 'onCreateRoomFormSubmit': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    createRoomForm: {
                        ...state.rooms.createRoomForm,
                        error: ''
                    }
                },
                _effect: {
                    type: 'createRoom',
                    payload: action.payload
                }
            }
        }
        case 'createRoom_success': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    createRoomForm: {
                        ...state.rooms.createRoomForm,
                        activeKey: '',
                        error: ''
                    },
                    roomsGroups: {
                        ...state.rooms.roomsGroups,
                        activeKey: 'moderatedRooms'
                    },
                    moderatedRooms: [action.payload.room, ...state.rooms.moderatedRooms]
                }
            }
        }
        case 'createRoom_error': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    createRoomForm: {
                        ...state.rooms.createRoomForm,
                        error: action.payload.error
                    }
                }
            }
        }
        case 'onSearchRoomsFormType': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    roomsGroups: {
                        ...state.rooms.roomsGroups,
                        activeKey: !action.payload.title?
                                        state.rooms.roomsGroups.activeKey == 'searchedRooms'?
                                            '':
                                            state.rooms.roomsGroups.activeKey:
                                        state.rooms.roomsGroups.activeKey

                    },
                    searchedRooms: action.payload.title?state.rooms.searchedRooms:[],
                    searchRoomsForm: {
                        ...state.rooms.searchRoomsForm,
                        title: action.payload.title
                    }
                }
            }
        }
        case 'onSearchRoomsFormSubmit': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    searchRoomsForm: {
                        ...state.rooms.searchRoomsForm,
                        error: ''
                    }
                },
                _effect: {
                    type: 'searchRooms',
                    payload: {title: state.rooms.searchRoomsForm.title}
                }
            }
        }
        case 'searchRooms_success': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    roomsGroups: {
                        ...state.rooms.roomsGroups,
                        activeKey: 'searchedRooms'
                    },
                    searchedRooms: [...action.payload.rooms]
                }
            }
        }
        case 'searchRooms_error': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    searchRoomsForm: {
                        ...state.rooms.searchRoomsForm,
                        error: action.payload.error
                    }
                }
            }
        }
        case 'onRoomsAccordionToggle': {
            return {
                ...state,
                rooms: {
                    ...state.rooms,
                    roomsGroups: {
                        ...state.rooms.roomsGroups,
                        activeKey: state.rooms.roomsGroups.activeKey!=action.payload.activeKey?action.payload.activeKey:''
                    }
                }
            }
        }
        default: {
            console.warn("Can't find handler for " + action.type);
            return state;
        }
    }
}
export const AppContext = createContext(null);

export const ReactApp = ({login, wsClient}) => {
    const [state, dispatch] = useReducer(stateReducer, {...initState, login});
    useEffect(()=>{dispatcher.reg(dispatch)}, [])
    return (
        <AppContext.Provider value={{state, dispatch}} >
            <Container  style={{height: "75%", width: "75%"}} fluid>
                <Row className="header" style={{height: "12%", overflowY: "hidden"}}>
                        <Header />
                </Row>
                        
                <Row style={{height: "88%", overflowY: "hidden", boxShadow: "0 0 5px black"}}>
                    <Col className="rooms">
                        <Rooms xs="3" style={{height: "100%"}} />
                    </Col> 
                    {/* <Col xs="9" style={{height: "100%"}}>
                        <Chat {...{apiActions, wsEventActions, dispatcher, wsClient}}/>
                    </Col> */}
                </Row>
            </Container>
        </AppContext.Provider>
    )
}