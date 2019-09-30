import {useState, useEffect, useRef} from 'react';
import {Actions} from '../Actions';
import { api } from '../api/api';

const initChatState = {
    room: {id: undefined, title: undefined, banned: undefined, joined: undefined},
    client: {login: ''},
    messages: [],
    ws: {client: null, subscription: ''},
    pageCount: 0,
    pageOffset: 0,
    prevRoom: null,
    sendMessageForm: {
        text: ''
    }
}

export const useChat = (dispatcher={yel: f=>f, reg: f=>f, unreg:f=>f}, apiActions={call:f=>f, cook:f=>f}, wsEventActions, wsClient) => {
    const [chat, setChat] = useState({...initChatState, ws: {...initChatState.ws, client: wsClient}});
    const dispatchIdRef = useRef();
    const wsSubscriptionId = useRef();
    const onNextRenderRef = useRef(null);
    const initSyncRef = useRef({messages: false});
    const dispatch = (event, payload) => {
        const {status, data, error} = payload;
        switch(event) {
            case 'onSendMessageFormType': {
                setChat({...chat, sendMessageForm: {...chat.sendMessageForm, text: data.text}});
                break;
            }
            case 'loadRoom': {
                if (chat.room.id != data.id || (chat.room.id == data.id && !chat.room.joined && data.joined)) {
                    if (!data.joined) {
                        setChat({...chat, ws: {...chat.ws}, room: {...data}});
                    } else {
                        setChat({...initChatState, ws: {...chat.ws}, room: {...data}});
                        initSyncRef.current = {...initChatState.current, messages: false}
                    }
                }
                break;
            }
            case 'joinRoom': {
                if(data==true){
                    apiActions.call("loadRoom", {id: chat.room.id});
                }
                break;
            }
            case 'leaveRoom': {
                chat.ws.client.unsubscribe(wsSubscriptionId.current);
                setChat(initChatState);
            }
            case 'getMessagePage': {
                setChat({...chat, messages: [...chat.messages, ...data.sort((a,b)=>(a.id-b.id))], pageCount: chat.pageCount + 1});
                break;
            }
            case 'onSendMessageFormSubmit': {
                setChat({...chat, sendMessageForm: {...chat.sendMessageForm, text: ''}});
                onNextRenderRef.current = () => apiActions.call("sendMessage", {client: chat.ws.client, id: chat.room.id, text: chat.sendMessageForm.text})
                break;
            }
            case 'messageSended': {
                setChat({...chat, messages: [...chat.messages, {...data.messageModel}]})
                break;
            }
            case 'setLogin': {
                setChat({...chat, client: {...chat.client, login: data.login}});
                break;
            }
        }
    }
    useEffect(()=> {
        if (dispatchIdRef.current) {
            
        }
        dispatchIdRef.current = dispatcher.reg(dispatch)
        return (()=>{dispatcher.unreg(dispatchIdRef.current);})
    })
    useEffect(()=>{
        if (!initSyncRef.current.messages && chat.room.id && chat.room.joined) {
            apiActions.call("getMessagePage",{roomId: chat.room.id, page: 0, offset: 0});
            initSyncRef.current = {...initSyncRef.current, messages: true};
        }
        const wsEventListener = ({body})=>{
            body = JSON.parse(body);
            wsEventActions.call(body.description.charAt(0).toLowerCase() + body.description.slice(1), {...body.info});
            // console.log("THERE IS A WS EVENT WATCH!" + event)
            // console.log(body.info);
        }
        if (chat.ws.client && chat.room.id && chat.room.joined)  {
            if (wsSubscriptionId.current) {
                chat.ws.client.unsubscribe(wsSubscriptionId.current);
            }
            wsSubscriptionId.current = chat.ws.client.subscribe("/topic/room/"+chat.room.id, wsEventListener);

        }        
    }, [chat.room.id, chat.room.joined])
    useEffect(()=>{
        if (typeof onNextRenderRef.current == 'function') {
            onNextRenderRef.current();
            onNextRenderRef.current = null;
        }
    }, [onNextRenderRef.current])
    const chatFunctions = {
        onJoinRoomFormSubmit: ({password}, yelOk=f=>f) =>  {
            apiActions.call("joinRoom", {id: chat.room.id, password});
        },
        setLogin:({login}, yelOk=f=>f) => {
            yelOk({login});
        },
        onSendMessageFormType: ({text}, yelOk=f=>f) => {
            yelOk({text});
        },
        onSendMessageFormSubmit: ({}, yelOk=f=>f) => {
            yelOk();
        },
        onLeaveRoomBtnClick: ({}, yelOk=f=>f) => {
            apiActions.call("leaveRoom", {id: chat.room.id});
        }
    }
    return [chat, Actions(chatFunctions, dispatcher, "chatActions")];
}