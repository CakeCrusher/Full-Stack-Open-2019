/* eslint-disable @typescript-eslint/no-explicit-any */
import {PatientFields, Patient, Gender} from './types'

const toNewPatient = (newPatient: any): Patient => {
    return {
        id: parseRegularString(newPatient.id, 'id'),
        name: parseRegularString(newPatient.name, 'name'),
        dateOfBirth: parseDate(newPatient.dateOfBirth),
        ssn: parseRegularString(newPatient.ssn, 'ssn'),
        gender: parseGender(newPatient.gender),
        occupation: parseRegularString(newPatient.occupation, 'occupation'),
        entries: newPatient.entries
    }
}
const isDate = (date: any): boolean => {
    return Boolean(Date.parse(date))
}
const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Invalid date field: ' + date)
    }
    return date
}
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender)
}
const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Invalid gender field: ' + gender)
    }
    return gender
} 

const parseRegularString = (str: any, field: any): string => {
    if (!str || !isString(str) || !Object.values(PatientFields).includes(field)) {
        throw new Error(`Invalid ${field} field: ` + str)
    }
    return str
}

const isString = (str: any): str is string => {
    return typeof str === 'string' || str instanceof String
}

export default toNewPatient;