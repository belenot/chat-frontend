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
import {Actions} from './Actions';
import {Dispatcher} from './Dispatcher';


var dispatcher = Dispatcher();
var apiActions = Actions(api, dispatcher, "API");

window.React = React;
window.api = api;
window.Stomp = Stomp;
window.SockJS = SockJS;

window.onload = () => {
    const wsConnectCallback = () => {
        let login = document.querySelector("meta[name='login']").content;
        ReactDOM.render(
            <ReactApp {...{login, apiActions, dispatcher, wsClient: client}}/>,
            document.querySelector("#react-app")
        )
    }
    let ws = new SockJS("/chat/ws");
    let client = Stomp.over(ws);
    window.wsClient = client
    let csrfToken = document.querySelector("meta[name='csrf-token']").content;
    let csrfHeader = document.querySelector("meta[name='csrf-header']").content;
    let headers = {[csrfHeader]: csrfToken};
    client.connect(headers, wsConnectCallback);
    
    window.onclose = () => {
        if (client.connected) {
            client.disconnect();
        }
    }
}