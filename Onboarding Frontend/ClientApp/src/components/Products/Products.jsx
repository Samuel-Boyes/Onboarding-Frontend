import React from 'react';
import useGetRequests from '../../hooks/APIHook';
import AddProductModal from './AddProductModal';
import DeleteProductModal from './DeleteProductModal';
import EditProductModal from './EditProductModal';

export const currentProductData = React.createContext([])

function ProductContainer() {
    const localUrl = "/api/Product"
    const [data, loading, error, refetch] = useGetRequests(localUrl)


    return (
        <><AddProductModal refetch={refetch} />
            <currentProductData.Provider value={data}>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data?.map((product) => {
                            return (<tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td><EditProductModal
                                    objId={product.id}
                                    refetch={refetch}
                                /></td>
                                <td><DeleteProductModal
                                    objId={product.id}
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
            </currentProductData.Provider>
        </>
    );
}

export default ProductContainer;