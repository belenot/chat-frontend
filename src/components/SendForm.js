export const SendForm = ({send=f=>f}) => {
    let inputRef;
    const onSubmit = (e) => {
        e.preventDefault();
        send(inputRef.value);
        inputRef.value="";
    }
    return (
        <form className="send-form" {...{onSubmit}}>
            <input type="text" placeholder="send..." autoComplete="off" ref={field=>inputRef=field}/>
            <input type="submit" value="&#10147;" />
        </form>
    )
}