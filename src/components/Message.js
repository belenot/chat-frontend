export const Message = ({className, message={}}) => (
    <section className={className}>
        <div className="info">
            <label>{message.client.login}</label>
            <label>{message.time}</label>
        </div>
        <div className="text">
            <p>{message.text}</p>
        </div>
    </section>
)