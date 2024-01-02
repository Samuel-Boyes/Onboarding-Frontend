import { useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';

function AddCustomerModal({ refetch }) {
    const localUrl = "/api/Customer"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [hasError, setHasError] = useState(false)

    function onAdd() {
        if (name !== "" && address !== "") {
            setHasError(false)
            APIService.postObject(localUrl, { "name": name, "address": address }).then(() => {
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
            size='small'
            open={open}
            trigger={<Button color='blue'>Add Customer</Button>}
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
                    content="Add"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onAdd()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default AddCustomerModal;