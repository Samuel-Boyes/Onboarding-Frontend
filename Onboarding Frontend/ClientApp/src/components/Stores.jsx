import React from 'react';
import useGetStoresRequests from '../hooks/StoresAPIHook';
import AddStoreModal from './AddStoreModal';
import DeleteStoreModal from './DeleteStoreModal';
import EditStoreModal from './EditStoreModal';

export const currentStoreData = React.createContext([])

function StoresContainer() {
    const localUrl = "/api/Store"
    const [data, loading, error, refetch] = useGetStoresRequests(localUrl)

    //console.log('data', data)
    //console.log(APIService.postObject(localUrl, { "name": 'namedelete', "address": "adrdelete" }))

    return (
        <><AddStoreModal refetch={refetch} />
            <currentStoreData.Provider value={data}>
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
                        {data ? data?.map((store, index) => {
                            return (<tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td><EditStoreModal
                                    objId={store.id}
                                    refetch={refetch}
                                /></td>
                                <td><DeleteStoreModal
                                    objId={store.id}
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
            </currentStoreData.Provider>
        </>
    );
}

export default StoresContainer;