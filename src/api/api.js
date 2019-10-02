import Stomp from 'stompjs';

const host = ""
function csrf() {
    let header = document.querySelector("meta[name='csrf-header']").content
    let token = document.querySelector("meta[name='csrf-token']").content
    return {[header]: token}
}
function handleErrors(response) {
    if(!response.ok) {
        let text = response.statusText || response.status == 400 && 'Bad Request' || response.status == 403 && 'Forbidden' || response.status == 404 && 'Not Found' ||
                    response.status >= 400 && response.status < 500 && `Client Error:${response.status}` || response.status >= 500 `Server Error${response.status}`
        throw Error(text)
    }
    return response;
}

export const api = {
    updateClient: ({updatedClient}) => fetch("/client/update", {
        method:'POST', 
        headers:{
            ...csrf(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedClient)
    }).then(handleErrors),
    deleteClient: () => fetch("/client/delete", {method: 'POST', headers:{...csrf()}}).then(handleErrors),
    getClients: ({id}) => fetch(`/room/${id}/clients`).then(handleErrors),
    logout: () => fetch("/logout", {method:'POST', headers:{...csrf()}}).then(handleErrors),    
    searchRooms: ({title}) => fetch(`/room/search?title=${encodeURIComponent(title&&"%"+title+"%"||"")}`, {
        method: "POST",
        headers: {
            ...csrf(),
            'Content-Type': 'application/x-www-url-encoded',
        }
    }).then(handleErrors).then(r=>r.json()),
    loadRoom: ({id}) => fetch(`/room/${id}`).then(handleErrors).then(response=>response.json()),    
    createRoom: ({title, password}) => fetch("/room/create", { 
            method: "POST", 
            headers: {
                ...csrf(),
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({title, password})
        }).then(handleErrors).then(r=>r.json()),
    getJoinedRooms: () => fetch("/room/joined").then(r=>r.json()),
    getModeratedRooms: () => fetch("/room/moderated").then(r=>r.json()),
    leaveRoom: ({id}) => fetch(`/room/${id}/leave`,{method:'POST', headers:{...csrf()}}).then(handleErrors),
    deleteRoom: ({id}) => fetch(`/room/${id}/moderator/delete`, {method: 'POST',headers: {...csrf()}}).then(handleErrors),
    ban: ({roomId, clientId})=> fetch(`/room/${roomId}/moderator/ban/${clientId}?ban=${true}`, {method: 'POST', headers:{...csrf()}}).then(handleErrors),
    unban: ({roomId, clientId})=> fetch(`/room/${roomId}/moderator/ban/${clientId}?ban=${false}`, {method: 'POST', headers:{...csrf()}}).then(handleErrors),
    joinRoom: ({id, password}) => fetch(`/room/${id}/join`,{method:'POST', headers:{...csrf()}, body: password||''}).then(handleErrors).then(response=>response.json()),
    sendMessage: ({client=Stomp.over(null), id, text}) => client.send(`/app/room/${id}/message/new`, {...csrf()}, text),
    getMessagePage: ({roomId, page, offset=0}) => fetch(`/room/${roomId}/messages?page=${encodeURIComponent(page)}&size=10&sort=id,DESC&offset=${offset || 0}`).then(handleErrors).then(response=>response.json()),
}
// var xhr = (method, resource, callback=f=>f, errorHandler=f=>f, contentType="application/x-www-urlencoded") => {
//     var xhr = new XMLHttpRequest();
//     xhr.open(method, resource);
//     xhr.setRequestHeader("Content-Type", contentType);
//     if (method == 'post') {
//         let header = document.querySelector("meta[name='csrf-header']").content
//         let token = document.querySelector("meta[name='csrf-token']").content
//         xhr.setRequestHeader(header, token);
//     }
//     xhr.onload = () => {
//         if (xhr.status === 200) {
//             callback(xhr.responseText);
//         } else {
//             errorHandler(xhr.responseText, xhr.status);
//         }
//     }
//     xhr.onerror = () => {
//         errorHandler(xhr.responseText, xhr.status);
//     }
//     return xhr;
// }