import { request } from "https"
import Stomp from 'stompjs';

const host = ""

export const api = {
    updateName: () => {
        //comming soon
    },
    changePassword: () => {
        //comming soon
    },
    updateAge: () => {
        //comming soon
    },
    deleteClient: () => {
        //comming soon
    },

    logout: () => {
        xhr("post", "/logout").send();
    },

    searchRoom: (title, callback=f=>f, errorHandler=console.log) => {
        xhr("get", "/room/search?title="+encodeURIComponent(title), callback, errorHandler).send();
    },
    loadRoom: (id, callback=f=>f, errorHandler=console.log) => {
        xhr("get", `/room/${id}`, callback, errorHandler).send();
    },
    createRoom: (title, password, callback=f=>f, errorHandler=console.log) => {
        xhr("post", "/room", callback, errorHandler, "application/json").send(JSON.stringify({title, password}));
    },
    getJoinedRooms: (callback=f=>f,errorHandler=console.log) => {
        xhr("get", "/room/joined", callback, errorHandler).send();
    },
    getModeratedRooms: (callback=f=>f, errorHandler=console.log) => {
        xhr("get", "/room/moderated", callback, errorHandler).send();
    },

    leaveRoom: (id, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${id}/leave`, callback, errorHandler).send();
    },
    deleteRoom: (id, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${id}/moderator/delete`, callback, errorHandler).send();
    },
    ban: (roomId, clientId, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${roomId}/moderator/ban/${clientId}`, callback, errorHandler).send();
    },

    join: (id, password, callback=f=>f, errorHandler=console.log) => {
        if (password) {
            xhr("post", `/room/${id}/join`, callback, errorHandler).send(password);
        } else {
            xhr("post", `/room/${id}/join`, callback, errorHandler).send();
        }
    },
    sendMessage: (client=Stomp.over(null), id, text) => {
        let csrfToken=document.querySelector("meta[name='csrf-token']").content;
        let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
        client.send(`/app/chat/room/${id}/message/new`, {[csrfHeader]: csrfToken}, text);
    }   
}
var xhr = (method, resource, callback=f=>f, errorHandler=f=>f, contentType="application/x-www-urlencoded") => {
    var xhr = new XMLHttpRequest();
    xhr.open(method, resource);
    xhr.setRequestHeader("Content-Type", contentType);
    if (method == 'post') {
        let header = document.querySelector("meta[name='csrf-header']").content
        let token = document.querySelector("meta[name='csrf-token']").content
        xhr.setRequestHeader(header, token);
    }
    xhr.onload = () => {
        if (xhr.status === 200) {
            callback(xhr.responseText);
        } else {
            errorHandler(xhr.responseText, xhr.status);
        }
    }
    xhr.onerror = () => {
        errorHandler(xhr.responseText, xhr.status);
    }
    return xhr;
}