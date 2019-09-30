export const wsEventApi = {
    clientBanned: ({clientId, banned}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId, banned});
    },
    clientDeleted: ({clientId}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId});
    },
    clientJoined: ({clientModel}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientModel});
    },
    clientLeaved: ({clientId}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId});
    },
    clientLeaved: ({clientId}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId});
    },
    clientSubscribed: ({clientId, subscribed}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId, subscribed});
    },
    clientUpdated: ({clientModel}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientModel});
    },
    clientLeaved: ({clientId}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({clientId});
    },
    messageSended: ({messageModel}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({messageModel});
    },
    roomDeleted: ({remainedRoomId}, yelOk=f=>f, yelErr=console.log) => {
        yelOk({remainedRoomId});
    }
}