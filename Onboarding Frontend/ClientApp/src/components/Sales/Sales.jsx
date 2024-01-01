import React from 'react';
import useGetRequests from '../../hooks/APIHook';
import AddSaleModal from './AddSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import EditSaleModal from './EditSaleModal';

export const currentSaleData = React.createContext([])
export const currentRelatedData = React.createContext({})

function SalesContainer() {
    const localUrl = "/api/Sale/detailed"
    const [data, loading, error, refetch] = useGetRequests(localUrl)
    const storeData = useGetRequests("/api/Store")[0]
    const productData = useGetRequests("/api/Product")[0]
    const customerData = useGetRequests("/api/Customer")[0]
    const relatedData = { stores: storeData, products: productData, customers: customerData }

    return (
        <><currentSaleData.Provider value={data}>
                <currentRelatedData.Provider value={relatedData}>
                    <AddSaleModal refetch={refetch} />
                    <table className="table table-striped" aria-labelledby="tableLabel">
                        <thead>
                            <tr>
                                <th>Customer</th>
                                <th>Product</th>
                                <th>Store</th>
                                <th>Date</th>
                                <th>Actions</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data ? data?.map((detailedsale) => {
                                var localDate = new Date(Date.parse(detailedsale.dateSold))
                                return (<tr key={detailedsale.id}>
                                    <td>{detailedsale.customerName}</td>
                                    <td>{detailedsale.productName}</td>
                                    <td>{detailedsale.storeName}</td>
                                    <td>{localDate.toDateString()}</td>
                                    <td><EditSaleModal
                                        objId={detailedsale.id}
                                        refetch={refetch}
                                    /></td>
                                    <td><DeleteSaleModal
                                        objId={detailedsale.id}
                                        refetch={refetch}
                                    />
                                    </td>
                                </tr>
                                )
                            }
                            ) : <tr></tr>
                            }
                        </tbody>
                    </table>
                </currentRelatedData.Provider>
            </currentSaleData.Provider>
        </>
    );
}

export default SalesContainer;