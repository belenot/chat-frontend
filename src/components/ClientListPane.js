import {StyledClientRow} from './styled/StyledClientRow';
import {useState} from 'react';

export const ClientListPane = ({className, initClients=[], changedClient={}}) => {
    const [filter, setFilter] = useState({online: true});
    const [clients, setClients] = useState(initClients);
    if (changedClient && (clients.find(client => client.id == changedClient.id && client.online != changedClient.online) || !clients.find(client => client.id == changedClient.id))) {
        setClients([...clients.filter(client => client.id != changedClient.id), changedClient])
    }
    return (
        <section className="className">
            <div>
                <p>Clients</p>
            </div>
            <div className="client-list">
                {clients.filter(client => client.online == filter.online).map(client => <StyledClientRow key={client.id} client={client} />)}
            </div>
            <div>
                <button onClick={()=>setFilter({...filter, online: !filter.online})}>{filter.online?'online':'offline'}</button>
            </div>
        </section>
    )
}