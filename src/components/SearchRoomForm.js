export const SearchRoomForm = ({onSearchRoomSubmit}) => {
    let searchField;
    const onSubmit = (e) => {
        e.preventDefault();
        onSearchRoomSubmit(searchField?searchField.value:"");
    }
    return (
        <form className="search-room-form" {...{onSubmit}}>
            <input ref={f=> searchField=f} type="search" placeholder="room..." />
            <input type="submit" value="go" />
        </form>
    )
}