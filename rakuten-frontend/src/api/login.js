import toJson from '../toJson/toJson'

const login = async (body) => {
    fetch(`http://localhost:8000/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    .then((resp) => {
        return JSON.parse(resp)
    })
    .catch((e) => {
        return e
    })
}

export default login