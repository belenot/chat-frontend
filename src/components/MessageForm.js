export const MessageForm = ({className, sendMessage=f=>f, typing=f=>f}) => {
    let textInput;
    let onSendMessage = (e) => {
        e.preventDefault();
        sendMessage(textInput.value);
        setTimeout(100);
        typing(true);
        textInput.value=null;
    }
    let onTyping = (e) => {
        typing(e.target.value?false:true);
    }
    return (
        <form className={className} onSubmit={e=>onSendMessage(e)}>
            <input onChange={e=>onTyping(e)} autoComplete="off" ref={el => textInput = el} type="text" name="message" placeholder="text" />
            <input type="image" src="/img/mail.png" value="send" />
        </form>
    )
}