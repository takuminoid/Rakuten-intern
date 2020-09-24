import React, {useState, useEffect} from 'react'

import getAnimal,{getOtherAnimal} from '../api/getAnimal'


//TODO show image
const User = ({name, sex, type, birthday, residence, profile}) => {
    return (
        <div>
            <p>name : {name}</p>
            <p>sex : {sex == 0 ? 'male' : 'female'}</p>
            <p>species : {type}</p>
            <p>location : {residence}</p>
            <p>birthday : {birthday}</p>
            <p>profile : {profile}</p>
        </div>
    )
}

const ViewProfile = () => {
    const [animal, setAnimal] = useState([])
    const [loading, setLoading] = useState(true)

    const dom = [animal]

    const user_id = 'hau'

    useEffect( async() => {
        getOtherAnimal(user_id)
        .then((u) => {
            setAnimal(u)
            setLoading(false)
        })
        .catch((e) => {
            throw new Error(e)
        })
    }, [])

    return (
        <div>
            {loading ? (<h1>Loading</h1>) : (dom.map(u => ( <User {...u} /> )))}
        </div>
    )

}

export default ViewProfile