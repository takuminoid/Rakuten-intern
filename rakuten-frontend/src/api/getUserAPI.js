const toJson = async (res) => {
    const js = await res.json()
    if (res.ok) {
        return js
    } else {
        throw new Error(js.message)
    }
}

const getUser = async () => {
    const resp = await fetch(`http://localhost:8000/`, {
        method: "GET",
        credentials: "same-origin",
    })
    return await toJson(resp)
}

export default getUser