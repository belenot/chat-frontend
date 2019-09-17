export const Header = ({login="", logout=f=>f}) =>  {
    const onLogout = () => {
        logout();
        window.location.href="/";
    }
    return (
        <header className="header">
            <button className="nav-btn">&#9881;</button>
            <label>{login}</label>
            <button className="nav-btn" onClick={onLogout}>logout</button>
        </header>
    )
}