import { useEffect, useState } from 'react'
import getAnimal from '../api/getAnimal'

const useGetUser = () => {
    const [user, setUser] = useState([])
    useEffect(async () => {
        getAnimal()
        .then(u => {
            setUser(u)
        })
        .catch(e => {
            throw new Error(e)
        })
    }, [])

    return user
}

export default useGetUser