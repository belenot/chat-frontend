import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

export const SendMessageForm = ({text, chatActions}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        chatActions.call("onSendMessageFormSubmit");
    }
    return (
        <Form className="send-form" {...{onSubmit}}>
            <Form.Row as={InputGroup}>
                <Form.Control type="text" placeholder="send..." autoComplete="off" value={text} onChange={(e)=>chatActions.call("onSendMessageFormType", {text: e.target.value})}/>
                <InputGroup.Append>
                    <Form.Control type="submit" value="&#10147;" />
                </InputGroup.Append>
            </Form.Row>
            
        </Form>
    )
}