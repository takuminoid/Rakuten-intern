import React, {useState} from 'react'

import useLogin from '../hooks/useLogin'

const Login = () => {

    const {
        handleChange, 
        handleSubmit, 
        state, 
    } = useLogin()

    const onChange = e => {
        handleChange(e)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
    } 
    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="username" value={state.username} onChange={onChange} placeholder="username" />
                <input type="password" name="password" value={state.password} onChange={onChange} placeholder="password"/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login 