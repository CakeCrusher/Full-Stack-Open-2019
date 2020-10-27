import express from 'express'

import patientService from '../services/patientService'
import toNewPatient from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
    res.send(patientService.getNonSensitivePatients())
})

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    
    res.send(patientService.getOnePatient(req.params.id))
})

router.post('/', (req, res) => {
    try {
        const patientWithId = {...req.body, id: Math.floor(Math.random() * Math.floor(1000)).toString()}
        const newPatient = toNewPatient(patientWithId)
        const savedPatient = patientService.addPatient(newPatient)

        res.json(savedPatient)
    } catch (e) {
        console.log(e.message);
        
        res.status(404).send(e.message)
    }
})

export default router;