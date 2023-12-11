import React, { Component, useEffect } from 'react';
import useGetRequests from '../hooks/APIHook';

function StoresContainer() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const stores = useGetRequests("/api/Store")

    console.log('stores',stores)

    return (
        <><button>Add</button>
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
                    {stores.data ? stores?.data.map(store =>
                        <tr key={store.id}>
                            <td>{store.name}</td>
                            <td>{store.address}</td>
                        </tr>
                    ) : <tr></tr>
                    }
                </tbody>
            </table>
        </>
    );
}

export default StoresContainer;