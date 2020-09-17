import React, {useEffect, useState } from 'react'

import login from '../api/login'

const initialState = {
    username: '', 
    password: ''
}



const useLogin = () => {
    const [login, setLogin] = useState(null)
    const [error, setError] = useState(null)
    const [token, setToken] = useState(null)

    const [state, setState] = useState(initialState)

    const handleChange = e => {
        setState({...state, [e.target.name]: e.target.value })
    }


    // TODO hooksで実現したい
    const handleSubmit = (body) => {
        const token = login(body)
        localStorage['token'] = token
        // useEffect(async () => {
        //     login(body)
        //     .then((token) => {
        //         localStorage['token'] = token
        //     })
        //     .catch((e) => {
        //         setError(e)
        //     })            
        // }, [])
        setState(initialState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}

export default useLogin