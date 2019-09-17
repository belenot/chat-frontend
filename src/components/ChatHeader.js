export const ChatHeader = ({chatHeader}) => (
    <header className="chat-header">
        <label>{chatHeader.roomTitle}</label>
        <div>
            <button className="nav-btn">leave</button>
            <button className="nav-btn">showClients</button>
        </div>
    </header>
)