export const EventRegistry = () => {
    let listeners = {};
    let registryId = 0;
    return {
        listen: (event, callback) => {
            listeners[event] = listeners[event]?[...listeners[event], {id: registryId, callback}]:[{id: registryId, callback}]
            return registryId++;
        },
        unlisten: (event, id) => {
            if (listeners[event]) {
                listeners[event] = listeners[event].filter(listener=>listener.id != id);
            }
        },
        fire: (event, data) => {
            (listeners[event] || []).map(listener=>listener.callback).forEach(callback=>callback(data));
        },
        prepare: (event) => (data) => {
            (listeners[event] || []).forEach(listener => listener.callback(data));
        }

    }
}