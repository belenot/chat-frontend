export const ChatHeader = ({title}) => (
    <header className="chat-header">
        <label>{title}</label>
        <div>
            <button className="nav-btn">leave</button>
            <button className="nav-btn">showClients</button>
        </div>
    </header>
)