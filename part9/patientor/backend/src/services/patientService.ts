import {Patient} from '../types'
import patients from '../../data/patients'

const getPatients = (): Patient[] => {
    return patients
}

const getNonSensitivePatients = (): Patient[] => {
    return patients.map(({id,name,dateOfBirth,gender,occupation, entries,ssn}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
        ssn
    }))
}

const getOnePatient = (id: string): Patient | undefined => {
    return patients.find(p => p.id === id)
}

const addPatient = (newPatient: Patient): Patient => {
    patients.push(newPatient)
    return newPatient
}

export default {
    getPatients,
    getNonSensitivePatients,
    getOnePatient,
    addPatient
}