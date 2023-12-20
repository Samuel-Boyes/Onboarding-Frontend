
const APIService = {
    postObject: async function (url, model, auth = false) {
        //need to update to fetch env stored API url
        const combinedUrl = "https://localhost:7052" + url
        try {
            console.log("posting data to: " + combinedUrl, model)
            const requestOptions = {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(model)
            }
            console.log(requestOptions)
            const res = await fetch(combinedUrl, requestOptions)
            const resJson = await res.json()
            console.log("response & data from " + combinedUrl, res, resJson)
            return resJson
        } catch (err) {
            console.log("error posting to: " + combinedUrl, err)
            throw err
        }
    },

    patchObject: async function (url, object, auth = false) {
        const combinedUrl = "https://localhost:7052" + url
        try {
            console.log("patching data to: " + combinedUrl, object)
            const requestOptions = {
                method: "PATCH",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(object)
            }
            console.log(requestOptions)
            const res = await fetch(combinedUrl, requestOptions)
            const resJson = await res.json()
            console.log("response & data from " + combinedUrl, res, resJson)
            return resJson
        } catch (err) {
            console.log("error patching to: " + combinedUrl, err)
            throw err
        }
    },

    deleteObject: async function (url, id, auth = false) {
        const combinedUrl = "https://localhost:7052" + url + '/' + id
        try {
            console.log("deleting data at: " + combinedUrl)
            const requestOptions = {
                method: "DELETE",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            console.log(requestOptions)
            const res = await fetch(combinedUrl, requestOptions)
            console.log("response & data from " + combinedUrl, res)
            return res
        } catch (err) {
            console.log("error deleting at: " + combinedUrl, err)
            throw err
        }
    },

    getObject: async function (url, id, auth = false) {
        const combinedUrl = "https://localhost:7052" + url + '/' + id
        try {
            console.log("getting data from: " + combinedUrl)
            const requestOptions = {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            console.log(requestOptions)
            const res = await fetch(combinedUrl, requestOptions)
            const resJson = await res.json()
            console.log("response & data from " + combinedUrl, res, resJson)
            return resJson
        } catch (err) {
            console.log("error getting from: " + combinedUrl, err)
            throw err
        }
    },

    getAllObject: async function (url, auth = false) {
        const combinedUrl = "https://localhost:7052" + url
        try {
            console.log("getting all data from: " + combinedUrl)
            const requestOptions = {
                method: "GET",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                }
            }
            console.log(requestOptions)
            const res = await fetch(combinedUrl, requestOptions)
            const resJson = await res.json()
            console.log("response & data from " + combinedUrl, res, resJson)
            return resJson
        } catch (err) {
            console.log("error getting all from: " + combinedUrl, err)
            throw err
        }
    },
}

export default APIService;