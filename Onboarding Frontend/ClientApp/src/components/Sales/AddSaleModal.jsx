import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentRelatedData } from './Sales';

function AddSaleModal({ refetch }) {

    const { customers, products, stores } = useContext(currentRelatedData);
    const localUrl = "/api/Sale"
    const [open, setOpen] = useState(false)
    const [customerId, setCustomerId] = useState("")
    const [storeId, setStoreId] = useState("")
    const [productId, setProductId] = useState("")
    const [dateSold, setDateSold] = useState("")
    const [hasError, setHasError] = useState(false)

    //console.log('data',customers, products, stores)

    function onAdd() {
        if (customerId !== "" && storeId !== "" && productId !== "" && dateSold !== "") {
            setHasError(false)
            APIService.postObject(localUrl, { "customerId": customerId, "storeId": storeId, "productId": productId, "dateSold": dateSold }).then(() => {
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
            trigger={<Button>Add</Button>}
        >
            <Modal.Header>Create Sale</Modal.Header>
            <Modal.Content>
                <Header>Date Sold</Header>
                <input type="datetime-local" value={dateSold} onChange={(event) => setDateSold(event.target.value)} />
                <Header>Customer</Header>
                <select name='customer' onChange={(event) => setCustomerId(event.target.value)}>
                    <option key={-1} value={""} label="Select a Customer" />
                    {customers?.map((item) =>
                        <option key={item.id} value={item.id} label={item.name} />
                    )}
                </select>
                <Header>Product</Header>
                <select name='product' onChange={(event) => setProductId(event.target.value)}>
                    <option key={-1} value={""} label="Select a Product" />
                    {products?.map((item) =>
                        <option key={item.id} value={item.id} label={item.name} />
                    )}
                </select>
                <Header>Store</Header>
                <select name='store' onChange={(event) => setStoreId(event.target.value)}>
                    <option key={-1} value={""} label="Select a Store" />
                    {stores?.map((item) =>
                        <option key={item.id} value={item.id} label={item.name} />
                    )}
                </select>
                {hasError &&
                    <div style={{ color: "red" }}>
                        Date Sold, Customer, Store and Product are required.
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

export default AddSaleModal;