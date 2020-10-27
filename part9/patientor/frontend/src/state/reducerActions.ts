import {Patient} from '../types'


export const setPatientList = (content: Patient[]) => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: content
    }
}
export const addPatient = (content: Patient) => {
    return {
        type: 'ADD_PATIENT',
        payload: content
    }
}