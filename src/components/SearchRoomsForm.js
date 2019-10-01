import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import { AppContext } from './ReactApp';
import {useEffect, useContext} from 'react';
import { api } from '../api/api';

export const SearchRoomsForm = () => {

    let {state, dispatch} = useContext(AppContext);
    let error = state.rooms.searchRoomsForm.error;
    let title = state.rooms.searchRoomsForm.title;
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({type: 'onSearchRoomsFormSubmit'})
    }
    useEffect(()=>{
        if (state._effect.type=='searchRooms') {
            api.searchRooms(
                state._effect.payload,
                (rooms) => dispatch({type:'searchRooms_success', payload: {rooms: JSON.parse(rooms)}}),
                (error) => dispatch({type: 'searchRooms_error', payload: {error}})
                )
        }
    },[state._effect])
    return (
        <Form className="search-room-form" {...{onSubmit}}>
            <InputGroup>
                <Form.Control type="text" placeholder="room..." onChange={e=>dispatch({type:"onSearchRoomsFormType", payload: {title: e.target.value}})} value={title}/>
                <InputGroup.Append>
                    <Form.Control type="submit" value="go" />
                </InputGroup.Append>
            </InputGroup>
            {error?<Alert variant="warning">{error}</Alert>:undefined}
        </Form>
    )
}