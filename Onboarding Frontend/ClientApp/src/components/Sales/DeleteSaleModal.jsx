﻿import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentSaleData } from './Sales';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function DeleteSaleModal(
    { objId , refetch }
) {

    const data = useContext(currentSaleData).filter(sale => sale.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Sale"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(data.id);
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
            trigger={<Button color='red'>Delete <FontAwesomeIcon icon={faTrash} /></Button>}
        >
            <Modal.Header>Delete Sale</Modal.Header>
            <Modal.Content>
                <p>Are you sure you want to delete sale #{data.id}?</p>
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

export default DeleteSaleModal;