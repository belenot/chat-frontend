import {useEffect} from 'react';

export const FloatWindow = ({children, title, info, onClose=f=>f, onSubmit}) => {
    let section;
    return (
        <section className="float-window" ref={s=>section=s}>
            <div className="nav">
                <label className="title">{title}</label>
                <div className="control-pane">
                    {onSubmit?<button className="submit-btn" onClick={onSubmit}>close</button>:null}
                    <button className="close-btn" onClick={onClose}>close</button>
                </div>
            </div>
            <div className="children-pane">
                {children}
            </div>
        </section>
    )
}