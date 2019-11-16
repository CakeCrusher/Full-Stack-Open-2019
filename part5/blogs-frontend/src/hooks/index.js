import { useState } from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')
    
    const onChange = (event) => {
        setValue(event.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return {
        fields: {
            type,
            value, 
            onChange
        },
        reset
    }
}

export const useResource = (baseUrl) => {
    const [token, set_Token] = useState(null)

    const setToken = (newToken) =>{
        set_Token(`bearer ${newToken}`)
    }

    const getAll = () => {
        const request = axios.get(baseUrl)
        return request.then(response => response.data)
    }

    const create = (newObject) => {
        const config = {
            headers: {Authorization: token}
        }
        const request = axios.post(baseUrl, newObject, config)
        console.log('request.data: ', request.data)
        return request.then(response =>{
            console.log('response.data: ', response.data)
            return response.data
        })
    }

    const login = async (credentials) => {
        const response = await axios.post(baseUrl, credentials)
        return response.data
    }

    const update = (newObject, id) => {
        const response = axios.put(`${baseUrl}/${id}`, newObject)
        return response.data
    }

    const _delete = (id) => {
        const config = {
            headers: {Authorization: token}
        }
        const response = axios.delete(`${baseUrl}/${id}`, config)
        return response.data
    }

    return {
        setToken,
        getAll,
        create,
        login,
        update,
        _delete
    }

}

