
export const Dispatcher = () => {
    let registry = [];
    let currentId = 0;
    return {
        reg: (callback=f=>f) => {
            registry = [...registry, {id:"reg-"+currentId, callback}];
            return "reg-"+currentId++;
        },
        unreg: (id) => {
            registry = registry.filter(registration => registration.id != id);
        },
        yel: (event="", payload={status: undefined, data: undefined}) => {
            registry.forEach(r => r.callback(event, payload));
        },
        notify(state, action) {
            registry.forEach(r => r.callback(state, action));
        }
    }
}