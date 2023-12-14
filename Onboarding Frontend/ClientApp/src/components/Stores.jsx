﻿import React from 'react';
import useGetRequests from '../hooks/APIHook';
import AddStoreModal from './AddStoreModal';
import EditStoreModal from './EditStoreModal';

function StoresContainer() {
    const localUrl = "/api/Store"
    const [ data, loading, error, refetch ] = useGetRequests(localUrl)

    console.log('data', data)
    //console.log(APIService.postObject(localUrl, { "name": 'namedelete', "address": "adrdelete" }))

    return (
        <><AddStoreModal refetch={refetch} />
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
                    {data ? data?.map(store =>
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                            <td><EditStoreModal refetch={refetch} /></td>
                            <td></td>
                        </tr>
                    ) : <tr></tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default StoresContainer;