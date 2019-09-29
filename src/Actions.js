import {Dispatcher } from './Dispatcher';
import {api} from './api/api';
const tryParse = (data) => {try {return JSON.parse(data)}catch(e){return data;}}
const yelOk = (event, dispatcher, source) => (response) => dispatcher.yel(event, {status: "ok", data: tryParse(response)}, source);
const yelErr = (event, dispatcher, source) => (error) => dispatcher.yel(event, {status: "err", data: tryParse(error)}, source);

export const Actions = (functions={}, dispatcher, source) => {
    const call = (action, param={}) => {
        if(typeof functions[action] == 'function') {
            if (dispatcher && typeof dispatcher.yel == 'function') {
                functions[action](param, yelOk(action, dispatcher, source), yelErr(action, dispatcher, source))
            } else {
                functions[action](param);
            }
        } else {
            let errorInfo = {source, action, param}
            console.log(`Undefined action: ${JSON.stringify(errorInfo)}`)
        }
    };
    const cook = (action, param={}) => () => call(action, param);
    return  {
        call,
        cook 
    }
}