
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
        throw new Error("Function Not implemented")
    },

    deleteObject: async function (url, object, auth = false) {
        throw new Error("Function Not implemented")
    },

    getObject: async function (url, id, auth = false) {
        throw new Error("Function Not implemented")
    },

    getAllObject: async function (url, auth = false) {
        throw new Error("Function Not implemented")
    },
}

export default APIService;