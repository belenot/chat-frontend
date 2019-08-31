import React from 'react';
import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {api} from './api/api';
import {StyledChatPane} from './components/styled/StyledChatPane';

window.React = React;
window.api = api;
var login = 'log';
var session;

var sendMessage = (message) => {
    //api.sendMessage(JSON.stringify(message), r => callback(JSON.parse(r)));
    client.send("/app/message", {session}, JSON.stringify(message));
}
var getMessages;
var provideMessages = (callback) => {
    getMessages = callback;
}

var recieveMessage= (r) =>{
    rerender([...getMessages(), JSON.parse(r.body)]);
}

var rerender = (messages) => {
    ReactDOM.render(
        <StyledChatPane initMessages={messages} sendMessage={sendMessage} provideMessages={provideMessages}/>,
        document.querySelector("#chat-pane")
    )
}

var ws = new SockJS("http://localhost:8080/chat/ws");
var client = Stomp.over(ws);
window.ws = ws;
window.client = client;
client.debug(console.log);
var connected = false;
var subscription;
client.connect({}, () => {
    subscription = client.subscribe("/topic/message", recieveMessage);
    session = client.ws._transport.url.split('/').slice(-2, -1)
});



window.onload = () => {
    api.getMessages(r => rerender(JSON.parse(r)));
}
window.onclose= () => {
    subscription.unsubscribe();
    client.disconnect();
}