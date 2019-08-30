import React from 'react';
import ReactDOM from 'react-dom';
import {api} from './api/api';
import {StyledChatPane} from './components/styled/StyledChatPane';

window.React = React;
window.api = api;

var sendMessage = (message, callback) => {
    api.sendMessage(JSON.stringify(message), r => callback(JSON.parse(r)));
}


var rerender = (messages) => {
    ReactDOM.render(
        <StyledChatPane initMessages={messages} sendMessage={sendMessage}/>,
        document.querySelector("#chat-pane")
    )
}

window.onload = () => {
    api.getMessages(r => rerender(JSON.parse(r)));
}