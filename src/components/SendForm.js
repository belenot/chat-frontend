import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

export const SendForm = ({send=f=>f}) => {
    let inputRef;
    const onSubmit = (e) => {
        e.preventDefault();
        send(inputRef.value);
        inputRef.value="";
    }
    return (
        <Form className="send-form" {...{onSubmit}}>
            <Form.Row as={InputGroup}>
                <Form.Control type="text" placeholder="send..." autoComplete="off" ref={field=>inputRef=field}/>
                <InputGroup.Append>
                    <Form.Control type="submit" value="&#10147;" />
                </InputGroup.Append>
            </Form.Row>
            
        </Form>
    )
}