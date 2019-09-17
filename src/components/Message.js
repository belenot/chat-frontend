export const Message = ({message}) => (
    <div className="message">
        <label className="username">{message.login}:</label>
        <label className="text">{message.text}</label>
        <label className="time">{message.time}</label>
    </div>
)