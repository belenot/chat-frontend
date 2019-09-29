import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

export const SearchRoomsForm = ({title, error, roomsActions={cook:f=>f, call:f=>f}}) => {
    let {cook, call} = roomsActions;
    const onSubmit = (e) => {
        e.preventDefault();
        roomsActions.call("onSearchRoomsFormSubmit")
    }
    return (
        <Form className="search-room-form" {...{onSubmit}}>
            <InputGroup>
                <Form.Control type="text" placeholder="room..." onChange={e=>call("onSearchRoomsFormType", {title: e.target.value})} value={title}/>
                <InputGroup.Append>
                    <Form.Control type="submit" value="go" />
                </InputGroup.Append>
            </InputGroup>
            {error?<Alert variant="warning">{error}</Alert>:undefined}
        </Form>
    )
}