import { useEffect, useState } from "react";


const useGetRequests = (url, auth = false) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState();
    const [error, setError] = useState();

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
                console.log("response & responseJson:", res, resJson)
                const data = resJson;
                setData(data);
            } catch (err) {
                console.log(err)
                setError(true);
                setData(undefined);
            }
        }
        fetchData();
        setLoading(false)
    }, [url, auth])
    return { data, loading, error };
}

export default useGetRequests

