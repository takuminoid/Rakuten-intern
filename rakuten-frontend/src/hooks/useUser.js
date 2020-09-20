import React, {useEffect, useState } from 'react'

import postHuman,{postAnimal}  from '../api/postUserAPI'
const initialState = {
    name: null, 
    age: null,
}
const HumanState = {
    email: null,
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
        postHuman(body)
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

    const handleChange = e => {
        setAnimalState({...state, [e.target.name]: e.target.value })
    }
    function handleImgChange(img) {
        setAnimalState({ ...state, ["image"]: img }) // TODO Base64？？　or そのまま？？
    }
    const handleSubmit = (body) => {
        postAnimal(body)
        setAnimalState(AnimalState)
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