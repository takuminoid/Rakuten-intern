import React, {useEffect, useState } from 'react'

import loginForSignup from '../api/login'

import postHuman,{postAnimal}  from '../api/postUserAPI'
const initialState = {
    name: null, 
    age: null,
}
const HumanState = {
    //TODO make user_id box
    user_id: null,
    mail: null,
    password: null,
}
const AnimalState = {
    name: null, 
    type: null,
    barthday: null,
    sex: null,
    residence: null,
    // email: null,
    // password: null,
    image:null,
    profile:null,
}
const HumanForm = () => {
    const [state, setHumanState] = useState(HumanState)

    const handleChange = e => {
        setHumanState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (body) => {
        //postHuman(body)
        localStorage.setItem('userinfo', JSON.stringify(body))
        const loginInfo = {
            'user_id': body.user_id,
            'password': body.password,
        }
        localStorage.setItem('loginInfo', JSON.stringify(loginInfo))
        setHumanState(HumanState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}
const AnimalForm = () => {
    const [state, setAnimalState] = useState(AnimalState)
    const [loading, setLoading] = useState(true)

    const handleChange = e => {
        setAnimalState({...state, [e.target.name]: e.target.value })
    }
    function handleImgChange(img) {
        setAnimalState({ ...state, ["image"]: img }) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        const addData = Object.assign(JSON.parse(localStorage.getItem('userinfo')), body)
    
        postAnimal(addData)
        .then((u) => {
            loginForSignup(JSON.parse(localStorage.getItem('loginInfo')))
            localStorage.removeItem('userinfo')
            localStorage.removeItem('loginInfo')
            setAnimalState(AnimalState)
            //history.push('/main')
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }

    return {
        handleChange, 
        handleSubmit, 
        state, handleImgChange
    }
}
// const UserForm = () => {
//     const [state, setState] = useState(initialState)

//     const handleChange = e => {
//         setState({...state, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = (body) => {
//         postUser(body)
//         setState(initialState)
//     }

//     return {
//         handleChange, 
//         handleSubmit, 
//         state, 
//     }
// }
export default HumanForm;
export  { AnimalForm};
