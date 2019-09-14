export const Message = ({username, text, time}) => (
    <div className="message">
        <label className="username">{username}:</label>
        <label className="text">{text}</label>
        <label className="time">{time}</label>
    </div>
)