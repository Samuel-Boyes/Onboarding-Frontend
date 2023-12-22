import React from 'react';
import useGetRequests from '../../hooks/APIHook';
import AddSaleModal from './AddSaleModal';
import DeleteSaleModal from './DeleteSaleModal';
import EditSaleModal from './EditSaleModal';

export const currentSaleData = React.createContext([])

function SalesContainer() {
    const localUrl = "/api/Sale"
    const [data, loading, error, refetch] = useGetRequests(localUrl)

    return (
        <><AddSaleModal refetch={refetch} />
            <currentSaleData.Provider value={data}>
                <table className="table table-striped" aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? data?.map((sale) => {
                            return (<tr key={sale.id}>
                                <td>{sale.name}</td>
                                <td>{sale.address}</td>
                                <td><EditSaleModal
                                    objId={sale.id}
                                    refetch={refetch}
                                /></td>
                                <td><DeleteSaleModal
                                    objId={sale.id}
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
            </currentSaleData.Provider>
        </>
    );
}

export default SalesContainer;