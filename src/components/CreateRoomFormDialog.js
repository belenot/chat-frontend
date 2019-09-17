import {useState} from 'react';

export const CreateRoomFormDialog = ({createRoom, close}) => {
    let [isPassword, setIsPassword] = useState(false);
    let form={isPassword: false};
    const onSubmit = (e) => {
        e.preventDefault();
        createRoom(form.title.value, form.password?form.password.value:undefined);
    }
    return (
        <div className="create-room-form-dialog dialog">
            <div className="dialog-nav">
                <button className="close-btn" onClick={()=>close()}>&times;</button>
            </div>
            <form onSubmit={onSubmit}>
                <label className="dialog-header">Create Room</label>
                <input ref={p=>form.title=p} type="text" name="title" placeholder="title" autoComplete="off"/>
                {isPassword?
                    <input ref={p=>form.password=p} type="password" name="password" placeholder="password"  /> 
                    : <input type="text" disabled placeholder="without password"/> 
                }
                <div>
                    <label>Include Password</label>
                    <input onClick={()=>setIsPassword(!isPassword)} type="checkbox" name="isPassword" />
                </div>
                <input type="submit" value="create" />

            </form>

        </div>
    )
}