export const OwnMessage = ({text, time}) => (
    <div className="message own-message">
        <label className="text">{text}</label>
        <label className="time">{time}</label>
    </div>
)