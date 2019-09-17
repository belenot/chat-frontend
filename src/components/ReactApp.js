import {Header} from './Header';
import {Rooms} from './Rooms';
import {Chat} from './Chat';
import React, {Fragment} from 'react';
import {useState} from 'react';
import {useEffect} from 'react'
import { JoinRoom } from './JoinRoom';

export const ReactApp = ({state, api, events, wsClient}) => {
    let [roomState, setRoomState] = useState();
    let joinListenId = -1;
    useEffect( ()=> {
        return ()=> {
            events.unlisten("joined", joinListenId);
        }
    })
    let chat={};

    events.listen("loaded", (data) => setRoomState(JSON.parse(data)));

    joinListenId = events.listen("joined", (data) => 
        setRoomState({...roomState, participant: JSON.parse(data)})
    )

    let send= (text) => {
        api.sendMessage(wsClient, roomState.room.id, text);
    }

    chat.chatHeader={roomTitle: roomState?roomState.room.title:null, participant: roomState?roomState.participant:null}
    chat.messages=roomState?roomState.room.messages:[];
    chat.roomId=roomState?roomState.room.id:-1;

    return (
        <Fragment>
            <Header header={state.header}/>
            <Rooms {...{events}} searchRoom={api.searchRoom} loadRoom={api.loadRoom} createRoom={api.createRoom} />
            {roomState?
            roomState.participant?<Chat {...{events}} chat={chat} send={send} wsClient={wsClient}/>:<JoinRoom chat={chat} join={()=>api.join(roomState.room.id, (data)=> events.prepare("joined")(data))} />
            :null}
        </Fragment>
    )
}