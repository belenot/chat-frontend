import {Header} from './Header';
import {Rooms} from './Rooms';
import {Chat} from './Chat';
import React, {Fragment} from 'react';
import {useState} from 'react';
import {useEffect} from 'react'
import { JoinRoom } from './JoinRoom';

export const ReactApp = ({login, api, events, wsClient}) => (

    <Fragment>
        <Header login={login} logout={api.logout}/>
        <Rooms {...{api, events}} />
        <Chat {...{api, events, wsClient}}/>
    </Fragment>
)