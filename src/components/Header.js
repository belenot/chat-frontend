export const Header = ({header}) => (
    <header className="header">
        {/* <button className="nav-btn" onClick="showSettings();">&#9881;</button> */}
        <button className="nav-btn">&#9881;</button>
        <img src={header.avatarSrc} style={{width: "1em", height: "1em"}}/>
        <label>{header.username}</label>
        <button className="nav-btn">logout</button>
    </header>
)