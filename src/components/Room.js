export const Room = ({room, loadRoom=f=>f}) => (
    <section className="room" onClick={()=>loadRoom()}>
            <img style={{width: "1em", height: "1em"}} />
            <label>{room.title}</label>
    </section>
)