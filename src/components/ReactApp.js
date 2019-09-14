import {Header} from './Header';
import {Rooms} from './Rooms';
import {Chat} from './Chat';
import React, {Fragment} from 'react';

export const ReactApp = () => (
    <Fragment>
        <Header />
        <Rooms />
        <Chat />
    </Fragment>
)