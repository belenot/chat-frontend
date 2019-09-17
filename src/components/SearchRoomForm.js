export const SearchRoomForm = ({searchRoom}) => {
    let searchField;
    const onSubmit = (e) => {
        e.preventDefault();
        searchRoom(searchField?searchField.value:"");
    }
    return (
        <form className="search-room-form" {...{onSubmit}}>
            <input ref={f=> searchField=f} type="search" placeholder="room..." />
            <input type="submit" value="go" />
        </form>
    )
}