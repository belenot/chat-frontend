import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const SearchRoomForm = ({searchRoom}) => {
    let searchField;
    const onSubmit = (e) => {
        e.preventDefault();
        searchRoom(searchField?searchField.value:"");
    }
    return (
        <Form className="search-room-form" {...{onSubmit}}>
            <InputGroup>
                <Form.Control ref={f=> searchField=f} type="search" placeholder="room..." />
                <InputGroup.Append>
                    <Form.Control type="submit" value="go" />
                </InputGroup.Append>
            </InputGroup>        
        </Form>
    )
}