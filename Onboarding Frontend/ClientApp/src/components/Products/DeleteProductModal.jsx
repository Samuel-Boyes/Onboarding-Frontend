import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentProductData } from './Products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteProductModal(
    { objId , refetch }
) {

    const data = useContext(currentProductData).filter(product => product.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Product"
    const [open, setOpen] = useState(false)

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
            trigger={<Button color='red'>Delete <FontAwesomeIcon icon={faTrash} /></Button>}
        >
            <Modal.Header>Delete Product</Modal.Header>
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

export default DeleteProductModal;