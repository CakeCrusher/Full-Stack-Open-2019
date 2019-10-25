import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const response = axios.get(baseUrl)
    return response.then(refined => refined.data)
}

const create = (newContact) => {
    const response = axios.post(baseUrl, newContact)
    return response.then(refined => refined.data)
}

const onDelete = (id) => {
    const response = axios.delete(baseUrl + '/' + id)
    return response.then(refined => refined.data)
}

const updateNum = (id, updatedPerson) => {
    const response  = axios.put(baseUrl + '/' + id, updatedPerson)
    return response.then(refined => refined.data)
} 

export default {getAll, create, onDelete, updateNum}