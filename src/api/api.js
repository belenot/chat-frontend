import { request } from "https"
import Stomp from 'stompjs';

const host = ""

export const api = {
    updateClient: ({updatedClient}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", "/client/update", callback, errorHandler, "application/json").send(JSON.stringify(updatedClient));
    },
    deleteClient: ({}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", "/client/delete", callback, errorHandler).send();
    },
    getClients: ({id}, callback=f=>f, errorHandler=console.log) => {
        xhr("get", `/room/${id}/clients`, callback, errorHandler).send();
    },

    logout: () => {
        xhr("post", "/logout").send();
    },

    searchRooms: ({title}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", "/room/search?title="+encodeURIComponent("%"+title+"%"), callback, errorHandler).send();
    },
    loadRoom: ({id}, callback=f=>f, errorHandler=console.log) => {
        xhr("get", `/room/${id}`, callback, errorHandler).send();
    },
    createRoom: ({title, password}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", "/room/create", callback, errorHandler, "application/json").send(JSON.stringify({title, password}));
    },
    getJoinedRooms: ({}, callback=f=>f,errorHandler=console.log) => {
        xhr("get", "/room/joined", callback, errorHandler).send();
    },
    getModeratedRooms: ({}, callback=f=>f, errorHandler=console.log) => {
        xhr("get", "/room/moderated", callback, errorHandler).send();
    },

    leaveRoom: ({id}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${id}/leave`, callback, errorHandler).send();
    },
    deleteRoom: ({id}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${id}/moderator/delete`, callback, errorHandler).send();
    },
    ban: ({roomId, clientId}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${roomId}/moderator/ban/${clientId}?ban=${true}`, callback, errorHandler).send();
    },
    unban: ({roomId, clientId}, callback=f=>f, errorHandler=console.log) => {
        xhr("post", `/room/${roomId}/moderator/ban/${clientId}?ban=${false}`, callback, errorHandler).send();
    },

    joinRoom: ({id, password}, callback=f=>f, errorHandler=console.log) => {
        if (password) {
            xhr("post", `/room/${id}/join`, callback, errorHandler).send(password);
        } else {
            xhr("post", `/room/${id}/join`, callback, errorHandler).send();
        }
    },
    sendMessage: ({client=Stomp.over(null), id, text}, callback=f=>f) => {
        let csrfToken=document.querySelector("meta[name='csrf-token']").content;
        let csrfHeader=document.querySelector("meta[name='csrf-header']").content;
        client.send(`/app/room/${id}/message/new`, {[csrfHeader]: csrfToken}, text);
        //callback();
    },
    getMessagePage: ({roomId, page, offset=0}, callback=f=>f, errorHandler=console.log) => {
        let url = `/room/${roomId}/messages?page=${encodeURIComponent(page)}&size=10&sort=id,DESC&offset=${offset || 0}`
        xhr("get", url, callback, errorHandler).send();
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