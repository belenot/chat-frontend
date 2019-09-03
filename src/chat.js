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

var sendMessage = (message) => {
    if (message.text)
        client.send("/app/message", {}, JSON.stringify(message));
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

var renderChatPane = (messages) => {
    ReactDOM.render(
        <StyledChatPane initMessages={messages} 
                        sendMessage={sendMessage} 
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

var ws = new SockJS("http://localhost:8080/chat/ws");
var client = Stomp.over(ws);
window.ws = ws;
window.client = client;
client.debug(console.log);
var messageSubscription;
var clientSubscription;
client.connect({}, () => {
    messageSubscription = client.subscribe("/topic/message", recieveMessage);
    clientSubscription = client.subscribe("/topic/client", clientChanged);
});



window.onload = () => {
    api.getMessages(r => renderChatPane(JSON.parse(r)));
    api.getClients(r => renderClientListPane(JSON.parse(r)));
}
window.onclose= () => {
    messageSubscription.unsubscribe();
    clientSubscription.unsubscribe();
    client.disconnect();
}