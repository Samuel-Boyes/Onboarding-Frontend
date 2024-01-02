import { useState, useContext } from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'
import APIService from '../../services/APIService';
import { currentRelatedData, currentSaleData } from './Sales';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom';
import { faSquarePen } from '@fortawesome/free-solid-svg-icons';
function EditSaleModal(
    { objId , refetch }
) {

    const { customers, products, stores } = useContext(currentRelatedData);

    const data = useContext(currentSaleData).filter(sale => sale.id === objId)[0]; //need to memoize this?
    const localUrl = "/api/Sale"
    const [open, setOpen] = useState(false)
    const [customerId, setCustomerId] = useState(data.customerId)
    const [storeId, setStoreId] = useState(data.storeId)
    const [productId, setProductId] = useState(data.productId)
    const [dateSold, setDateSold] = useState(data.dateSold)
    const [hasError, setHasError] = useState(false)

    function onEdit() {
        if (customerId !== "" && storeId !== "" && productId !== "" && dateSold !== "") {
            setHasError(false)
            APIService.patchObject(localUrl, { "id": objId, "customerId": customerId, "storeId": storeId, "productId": productId, "dateSold": dateSold }).then(() => {
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
            <Modal.Header>Edit Sale</Modal.Header>
            <Modal.Content>
                <Header>Date Sold</Header>
                <input type="datetime-local" value={dateSold} onChange={(event) => setDateSold(event.target.value)} />
                <Header>Customer</Header>
                <select name='customer' defaultValue={customerId} onChange={(event) => setCustomerId(event.target.value)}>
                    {customers?.map((item) =>
                        <option key={item.id} value={item.id} label={item.name} />
                    )}
                </select>
                <Header>Product</Header>
                <select name='product' defaultValue={productId} onChange={(event) => setProductId(event.target.value)}>
                    {products?.map((item) =>
                        <option key={item.id} value={item.id} label={item.name} />
                    )}
                </select>
                <Header>Store</Header>
                <select name='store' defaultValue={storeId} onChange={(event) => setStoreId(event.target.value)}>
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

export default EditSaleModal;