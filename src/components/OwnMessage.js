export const OwnMessage = ({message}) => (
    <div className="message own-message">
        <label className="text">{message.text}</label>
        <label className="time">{message.time}</label>
    </div>
)