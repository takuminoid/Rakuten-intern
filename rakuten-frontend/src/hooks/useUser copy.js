import React, {useEffect, useState } from 'react'

import postUser from '../api/postUserAPI'

const HumanState = {
    email: '',
    pw: '',
}
const AnimalState = {
    name: '', 
    age: null,
    type: null,
    barthday: null,
    sex: null,
    residence: '',
    email: '',
    pw: '',
}
const HumanForm = () => {
    const [state, setHumanState] = useState(HumanState)

    const handleChange = e => {
        setHumanState({...state, [e.target.name]: e.target.value })
    }

    const handleSubmit = (body) => {
        postUser(body)
        setHumanState(initialState)
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

    const handleSubmit = (body) => {
        postUser(body)
        setAnimalState(initialState)
    }

    return {
        handleChange, 
        handleSubmit, 
        state, 
    }
}

export default {HumanForm, AnimalForm}