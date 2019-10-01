import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Col from 'react-bootstrap/Col';

export const SendMessageForm = ({text, dispatch=f=>f}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        text && dispatch({type: "onSendMessageFormSubmit"});
    }
    const onType = (e) => {
        dispatch({type: 'onSendMessageFormType', payload: {text: e.target.value}})
    }
    return (
        <Form className="send-form" {...{onSubmit}}>
            <Form.Row as={InputGroup}>
                <Form.Control type="text" placeholder="send..." autoComplete="off" value={text} onChange={onType}/>
                <InputGroup.Append>
                    <Form.Control type="submit" value="&#10147;" />
                </InputGroup.Append>
            </Form.Row>
            
        </Form>
    )
}