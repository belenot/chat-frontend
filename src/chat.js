import React from 'react';
import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {api} from './api/api';
import {state} from './state'
import {strictTheme} from './components/styled/themes/strictTheme';
import { ReactApp } from './components/ReactApp';
import { EventRegistry } from './EventRegistry';
import 'bootstrap/dist/css/bootstrap.min.css';



window.React = React;
window.api = api;
window.Stomp = Stomp;
window.SockJS = SockJS;

var ws;
var client;

window.onload = () => {
    ws = new SockJS("/chat/ws");
    client = Stomp.over(ws);
    let csrfToken = document.querySelector("meta[name='csrf-token']").content;
    let csrfHeader = document.querySelector("meta[name='csrf-header']").content;
    let headers = {[csrfHeader]: csrfToken};
    client.connect(headers, wsConnectCallback)
}

window.onclose = () => {
    if (client.connected) {
        client.disconnect();
    }
}

const wsConnectCallback = () => {
    let login = document.querySelector("meta[name='login']").content;
    ReactDOM.render(
        <ReactApp login={login} api={api} events={EventRegistry()} wsClient={client}/>,
        document.querySelector("#react-app")
    )
}