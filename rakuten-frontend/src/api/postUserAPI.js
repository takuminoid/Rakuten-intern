const toJson = async (res) => {
    const js = await res.json()
    if (res.ok) {
        return js
    } else {
        throw new Error(js.message)
    }
}
// TODO 404帰ってくる，リクエストは遅れてるからよし！
const postHuman = async (body) => { 
    const resp = await fetch(`http://localhost:8000/register/human`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    
    return toJson(resp)
}
const postAnimal = async (body) => { 
    const resp = await fetch(`http://localhost:8000/register/animal`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    
    return toJson(resp)
}
// const postUser = async (body) => { 
//     const resp = await fetch(`http://localhost:8000/`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         credentials: "same-origin",
//         body: JSON.stringify(body), 
//     })
    
//     return toJson(resp)
// }
export default postHuman
export {postAnimal} 