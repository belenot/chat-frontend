export const JoinRoom = ({chat, join}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        join();
    }
    return (
        <div className="dialog">
            <form onSubmit={(e)=>onSubmit(e)}>
                <label>{`Join to ${chat.chatHeader.roomTitle}`}</label>
                <input type="password" />
                <input type="submit" value="join" />
            </form>
        </div>
    )
}