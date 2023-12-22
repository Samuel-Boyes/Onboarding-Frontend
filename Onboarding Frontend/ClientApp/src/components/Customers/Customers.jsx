import React from 'react';
import useGetRequests from '../../hooks/APIHook';
import AddCustomerModal from './AddCustomerModal';
import DeleteCustomerModal from './DeleteCustomerModal';
import EditCustomerModal from './EditCustomerModal';

export const currentCustomerData = React.createContext([])

function CustomerContainer() {
    const localUrl = "/api/Customer"
    const [data, loading, error, refetch] = useGetRequests(localUrl)

    return (
        <><AddCustomerModal refetch={refetch} />
            <currentCustomerData.Provider value={data}>
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
                        {data ? data?.map((customer) => {
                            return (<tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.address}</td>
                                <td><EditCustomerModal
                                    objId={customer.id}
                                    refetch={refetch}
                                /></td>
                                <td><DeleteCustomerModal
                                    objId={customer.id}
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
            </currentCustomerData.Provider>
        </>
    );
}

export default CustomerContainer;