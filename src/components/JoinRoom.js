import Form from "react-bootstrap/Form";
import FormGroup from 'react-bootstrap/FormGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export const JoinRoom = ({title, join}) => {
    let passwordField;
    const onSubmit = (e) => {
        e.preventDefault();
        join(passwordField.value);
    }
    return (
        <Card style={{width: "60%", alignSelf: "center"}}>
            <Card.Header><h3>{`Join to ${title}`}</h3></Card.Header>
            <Card.Body>
                <Form onSubmit={(e)=>onSubmit(e)}>
                    <FormGroup id="passwordField">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" ref={f=>passwordField=f} />
                        <Form.Text className="text-muted">If room is public leave it empty</Form.Text>
                    </FormGroup>
                    <Button type="submit">join</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}