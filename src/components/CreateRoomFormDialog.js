import {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export const CreateRoomFormDialog = ({createRoom}) => {
    let [isPassword, setIsPassword] = useState(false);
    let form={isPassword: false};
    const onSubmit = (e) => {
        e.preventDefault();
        createRoom(form.title.value, form.password?form.password.value:undefined);
        form.password.value=null;
        form.title.value=null;
    }
    return (
            <Form className="add-room-form" onSubmit={onSubmit}>
                <Form.Group>
                    <Form.Label className="dialog-header">Create Room</Form.Label>
                    <Form.Control ref={p=>form.title=p} type="text" name="title" placeholder="title" autoComplete="off"/>
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