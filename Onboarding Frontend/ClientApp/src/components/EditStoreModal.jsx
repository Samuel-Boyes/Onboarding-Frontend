import { useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../services/APIService';

function EditStoreModal(
         objId ,
    { refetch }
    ) {

    console.log('editStoreModal objId',objId)
    const localUrl = "/api/Store"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [hasError, setHasError] = useState(false)


    function onEdit() {
        if (name !== "" && address !== "") {
            setHasError(false)
            const res = APIService.patchObject(localUrl, {objId, "name": name, "address": address })
            refetch()
            setOpen(false)
        } else {
            setHasError(true)
        }
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Edit</Button>}
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

export default EditStoreModal;