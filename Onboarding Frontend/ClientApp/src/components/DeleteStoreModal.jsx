import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../services/APIService';
import { currentStoreData } from './Stores';

function DeleteStoreModal(
    { objId , refetch }
) {

    const data = useContext(currentStoreData).filter(store => store.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Store"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(data.name);
    const [address, setAddress] = useState(data.address);

    function onDelete() {
        APIService.deleteObject(localUrl, objId).then(() => {
                refetch()
                setOpen(false)
            })
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color='red'>Delete</Button>}
        >
            <Modal.Header>Create Store</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete {data.name}?</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    No
                </Button>
                <Button
                    content="Yes"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => onDelete()}
                    positive
                />
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteStoreModal;