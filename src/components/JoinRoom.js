export const JoinRoom = ({title, join}) => {
    let passwordField;
    const onSubmit = (e) => {
        e.preventDefault();
        join(passwordField.value);
    }
    return (
        <div className="dialog">
            <form onSubmit={(e)=>onSubmit(e)}>
                <label>{`Join to ${title}`}</label>
                <input type="password" ref={f=>passwordField=f}/>
                <input type="submit" value="join" />
            </form>
        </div>
    )
}