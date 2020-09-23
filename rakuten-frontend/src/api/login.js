import toJson from '../toJson/toJson'
import React, {useEffect, useState } from 'react'

const loginForSignup = async (body) => {
    console.log(body)
    fetch(`http://localhost:8000/login/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin",
        body: JSON.stringify(body), 
    })
    .then((resp) => {
        return resp.json()
    })
    .then((resp) => {
        if (resp.token != undefined) {
            localStorage.setItem('token', resp.token)
            console.log(resp)
        } else {
            alert('認証できませんでした')
        }
    })
    .catch((e) => {
        return e
    })
}

export default loginForSignup