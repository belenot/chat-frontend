export const Message = ({message}) => (
    <div className="message">
        <label className="username">{message.participant.client.login}:</label>
        <label className="text">{message.text}</label>
        <label className="time">{message.time}</label>
    </div>
)