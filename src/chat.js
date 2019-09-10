import React from 'react';
import ReactDOM from 'react-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
import {api} from './api/api';
import {StyledChatPane} from './components/styled/StyledChatPane';
import {StyledClientListPane} from './components/styled/StyledClientListPane';
import {strictTheme} from './components/styled/themes/strictTheme';

window.React = React;
window.api = api;

var typingClients=[];
var sendMessage = (message) => {
    if (message.text)
        client.send("/app/message", {}, JSON.stringify(message));
}
var typing = (stop) => {
    let typingClient = {login: currentClientLogin, stop};
    client.send("/topic/typing", {},  JSON.stringify(typingClient))
}
var getMessages;
var provideMessages = (callback) => {
    getMessages = callback;
}

var recieveMessage= (r) =>{
    renderChatPane([...getMessages(), JSON.parse(r.body)]);
}
var clientChanged = (r) => {
    renderClientListPane(null, JSON.parse(r.body));
}
var typingStatusChanged = (r) => {
    let currentClient = JSON.parse(r.body);
    typingClients = [...typingClients.filter(client => currentClient.login != client.login)];
    if (!currentClient.stop) {
        typingClients = [...typingClients, currentClient];
    }
    renderChatPane([], typingClients);
}

var renderChatPane = (messages, typingClients) => {
    ReactDOM.render(
        <StyledChatPane initMessages={messages} 
                        typingClients={typingClients}
                        currentClientLogin={currentClientLogin}
                        sendMessage={sendMessage}
                        typing={typing}
                        provideMessages={provideMessages}
                        theme={strictTheme}/>,
        document.querySelector("#chat-pane")
    )
}

var renderClientListPane = (clients, changedClient) => {
    ReactDOM.render(
        <StyledClientListPane initClients={clients} 
                              changedClient={changedClient}
                              theme={strictTheme}/>,
        document.querySelector("#chat-client-list-pane")
    )
}
var currentClientLogin;
var ws = new SockJS(`${location.protocol}//${location.host}/chat/ws`);
var client = Stomp.over(ws);
window.ws = ws;
window.client = client;
var messageSubscription;
var clientSubscription;
var typingSubscription;
client.connect({}, () => {
    messageSubscription = client.subscribe("/topic/message", recieveMessage);
    clientSubscription = client.subscribe("/topic/client", clientChanged);
    typingSubscription = client.subscribe("/topic/typing", typingStatusChanged);
});



window.onload = () => {
    currentClientLogin = document.querySelector('#client-info label').innerText;
    api.getMessages(r => renderChatPane(JSON.parse(r)));
    api.getClients(r => renderClientListPane(JSON.parse(r)));
}
window.onclose= () => {
    messageSubscription.unsubscribe();
    clientSubscription.unsubscribe();
    client.disconnect();
}