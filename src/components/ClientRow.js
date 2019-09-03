export const ClientRow = ({className, client}) => (
    <div className={className}>
        <span className="online-indicator">&#x2B24;</span>{" " + client.login}
    </div>
)