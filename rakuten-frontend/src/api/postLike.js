import toJson from '../toJson/toJson'

var token = localStorage.getItem('token')

export const CreateLike = async (pid, uid) => {
    const body = { post_id: pid, user_id: 1 }
    const resp = await fetch(`http://localhost:8000/api/like/`, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${token}`
        }, 
        body: JSON.stringify(body)
    })
    return await resp
}

export const DeleteLike = async (post_id, user_id) => {
    const body = {post_id, post_id, user_id: user_id}
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

