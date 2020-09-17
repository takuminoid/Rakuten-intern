import React, {useEffect, useState } from 'react'

import postUser from '../api/postUserAPI'

const initialState = {
    name: '', 
    age: 0
}

const UserForm = () => {
    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (body) => {
        postUser(body)
        setState(initialState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}

export default UserForm