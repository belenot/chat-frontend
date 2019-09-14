import React from 'react';
import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {api} from './api/api';
import {strictTheme} from './components/styled/themes/strictTheme';
import { ReactApp } from './components/ReactApp';


window.React = React;
window.api = api;

window.onload = () => {
    ReactDOM.render(
        <ReactApp />,
        document.querySelector("body")
    )
}
