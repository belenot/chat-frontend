export const TypingStatus = ({className="", clients={}, backGetClients=f=>f}) => {
    backGetClients(()=>[...clients]);
    return (
        <section className={className}>
            {clients.length > 0 ?
                clients.length == 1 ? `${clients[0].login} is typing...` :
                clients.map((client,index) => index  < clients.length - 1 ? `${client.login}, ` : `${client.login} are typing`)
                
                : ''
            }
            
        </section>
    )
}