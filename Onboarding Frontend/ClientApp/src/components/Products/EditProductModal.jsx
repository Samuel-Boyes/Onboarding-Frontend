import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentProductData } from './Products';

function EditProductModal(
    { objId , refetch }
    ) {

    const data = useContext(currentProductData).filter(product => product.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Product"
    const [open, setOpen] = useState(false)
    const [name, setName] = useState(data.name);
    const [price, setPrice] = useState(data.price);
    const [hasError, setHasError] = useState(false)
    const [hasErrorInt, setHasErrorInt] = useState(false)

    function onEdit() {
        if (name !== "" && price !== "") {
            setHasError(false)
            const flPrice = parseFloat(price)
            if (isNaN(flPrice)) {
                setHasErrorInt(true)
            } else {
                setHasErrorInt(false)
                APIService.patchObject(localUrl, { "id": objId, "name": name, "price": flPrice }).then(() => {
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
            open={open}
            trigger={<Button color='yellow'>Edit</Button>}
        >
            <Modal.Header>Edit Product</Modal.Header>
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

export default EditProductModal;