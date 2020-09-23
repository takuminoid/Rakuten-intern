import React, {useState, useEffect} from 'react'

import useLogin from '../hooks/useLogin'

import { useHistory } from 'react-router-dom'

const Login = () => {

    let history = useHistory()

    const [user, setUser] = useState(null)
    const {
        handleChange, 
        handleSubmit, 
        state, 
        token, 
    } = useLogin()

    const onChange = e => {
        handleChange(e)
    }
    const onSubmit = e => {
        e.preventDefault()
        handleSubmit(state)
        history.push('/main')
    } 

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name="user_id" value={state.user_id} onChange={onChange} placeholder="user_id" />
                <input type="password" name="password" value={state.password} onChange={onChange} placeholder="password"/>
                <input type="submit" />
            </form>
        </div>
    )
}

export default Login 