export const MessageForm = ({className, sendMessage=f=>f}) => {
    let textInput;
    let onSendMessage = (e) => {
        e.preventDefault();
        sendMessage(textInput.value);
        textInput.value=null;
    }
    return (
        <form className={className} onSubmit={e=>onSendMessage(e)}>
            <input autoComplete="off" ref={el => textInput = el} type="text" name="message" placeholder="text" />
            <input type="image" src="/img/mail.png" value="send" />
        </form>
    )
}