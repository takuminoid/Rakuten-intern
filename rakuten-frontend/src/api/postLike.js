import toJson from '../toJson/toJson'

var token = localStorage.getItem('token')

export const CreateLike = async (body) => {
    const resp = await fetch(`http://localhost:8000/api/like/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
          'Authorization': `JWT ${token}`
        }, 
        body: JSON.stringify(body)
    })
    return await resp
}

export const DeleteLike = async (body) => {
    const resp = await fetch(`http://localhost:8000/api/like/`, {
        method: "DELETE",
        credentials: "same-origin",
        headers: {
          'Authorization': `JWT ${token}`
        }, 
        body: JSON.stringify(body)
    })
    return await resp
}

