import { useEffect, useState } from "react";


const useGetRequests = (url, auth = false) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [shouldRefetch, refetch] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        const fetchData = async () => {
            try {
                console.log("fetching data from: " + "https://localhost:7052" + url)
                //const requestOptions = auth ? { headers: { Authorization: `Bearer ${window.localStorage.getItem("auth")}` } } : null;
                const requestOptions = { method: "GET", mode: "cors", credentials: "same-origin" }
                const res = await fetch("https://localhost:7052" + url, requestOptions)
                const resJson = await res.json()
                const data = resJson;
                console.log("response & data from " + "https://localhost:7052" + url, res, data)
                setData(data);
            } catch (err) {
                console.log(err)
                setError(true);
                setData(undefined);
            }
        }
        fetchData();
        setLoading(false)
    }, [url, auth, shouldRefetch])
    return [ data, loading, error, refetch ];
}

export default useGetRequests

