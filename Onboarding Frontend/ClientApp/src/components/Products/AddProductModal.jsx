import { useState } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';

function AddProductModal({ refetch }) {
    const localUrl = "/api/Product"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [hasError, setHasError] = useState(false)
    const [hasErrorInt, setHasErrorInt] = useState(false)

    function onAdd() {
        if (name !== "" && price !== "") {
            setHasError(false)
            const flPrice = parseFloat(price)
            if (isNaN(flPrice)) {
                setHasErrorInt(true)
            } else {
                setHasErrorInt(false)
                APIService.postObject(localUrl, {"name": name, "price": flPrice }).then(() => {
                    refetch()
                    setOpen(false)
                })
            }
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
            trigger={<Button color='blue'>Add Product</Button>}
        >
            <Modal.Header>Create Product</Modal.Header>
            <Modal.Content>
                <Header>Name</Header>
                <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                <Header>Price</Header>
                <input type="text" value={price} onChange={(event) => setPrice(event.target.value)} />
                {hasError &&
                    <div style={{ color: "red" }}>
                        Both Name and Price are required.
                    </div>
                }
                {hasErrorInt &&
                    <div style={{ color: "red" }}>
                        Price must be a number.
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

export default AddProductModal;