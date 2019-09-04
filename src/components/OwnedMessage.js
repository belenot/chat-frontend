export const OwnedMessage = ({className, message={}}) => (
    <section className={className}>
        <div className="info">
            <label>[{message.time}]:</label>
        </div>
        <div className="text">
            {message.text}
        </div>
    </section>
)