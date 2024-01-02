import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentCustomerData } from './Customers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';

function EditCustomerModal(
    { objId , refetch }
    ) {

    const data = useContext(currentCustomerData).filter(customer => customer.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Customer"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(data.name);
    const [address, setAddress] = useState(data.address);
    const [hasError, setHasError] = useState(false)

    function onEdit() {
        if (name !== "" && address !== "") {
            setHasError(false)
            APIService.patchObject(localUrl, { "id": objId, "name": name, "address": address }).then(() => {
                refetch()
                setOpen(false)
            })
        } else {
            setHasError(true)
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='yellow'>Edit <FontAwesomeIcon icon={faSquarePen} /></Button>}
        >
            <Modal.Header>Create Store</Modal.Header>
            <Modal.Content>
                <Header>Name</Header>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <Header>Address</Header>
                <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
                {hasError &&
                    <div style={{ color: "red" }}>
                        Both Name and Address are required.
                    </div>
                }
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Close
                </Button>
                <Button
                    content="Edit"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onEdit()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default EditCustomerModal;