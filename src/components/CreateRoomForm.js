import {useState, useEffect, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { AppContext } from './ReactApp';
import { api } from '../api/api';

export const CreateRoomForm = () => {
    const {state, dispatch} = useContext(AppContext);
    const {error} = state.rooms.createRoomForm;
    useEffect(()=>{
        if(state._effect.type == 'createRoom') {
            api.createRoom(
                state._effect.payload, 
                (room) => dispatch({type:'createRoom_success', payload: {room: JSON.parse(room)}}),
                (error) => dispatch({type:'createRoom_error', payload: {error}})
            )
        }
    }, [state._effect])
    let form={isPassword: false};
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({type: "onCreateRoomFormSubmit", payload: {title: form.title.value, password: form.password?form.password.value:undefined}});
        form.password.value='';
        form.title.value='';
    }
    return (
            <Form className="add-room-form" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label className="dialog-header">Create Room</Form.Label>
                    <Form.Control ref={p=>form.title=p} type="text" name="title" placeholder="title" autoComplete="off"/>
                    {error?<Alert variant="warning">{error.status || error}</Alert>:undefined}
                    <Accordion>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            password
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                            <Form.Control ref={p=>form.password=p} type="password" name="password" placeholder="password"  /> 
                        </Accordion.Collapse>
                    </Accordion>
                </Form.Group>
                <Form.Control type="submit" value="create" />

            </Form>
    )
}