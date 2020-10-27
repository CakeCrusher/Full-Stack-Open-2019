import React from 'react'
import axios from 'axios'
import {apiBaseUrl} from '../constants'
import {Entry, Patient} from '../types'
import {useStateValue} from '../state/state'
import {Icon} from 'semantic-ui-react'

const PatientPage: Function = ({id}: {id: string}) => {
    const [{patients}, dispatch] = useStateValue()
    React.useEffect(() => {
        axios.get<void>(`${apiBaseUrl}/patients/${id}`);
    
        const addPatient = async () => {
          try {
            const { data: patient } = await axios.get<Patient>(
              `${apiBaseUrl}/patients`
            );
            dispatch({
              type: 'ADD_PATIENT',
              payload: patient
            });
          } catch (e) {
            console.error(e);
          }
        };
        const reduxItem = Object.values(patients).find((p: Patient | undefined) => p ? p.id === id && p.ssn : null)
        
        if (!reduxItem) {
          addPatient();
        }
    }, [dispatch]);
    const thisPatient = Object.values(patients).find((p: Patient | undefined) => p ? p.id === id : null)
    // console.log(typeof patients.id, typeof id);

    if (thisPatient) {
      const Entries = ({entry}: {entry: Entry}) => {
        switch (entry.type) {
          case 'Hospital':
            return (
              <div style={{border: '1px solid black'}}>
                <div style={{display: 'flex'}}>
                  <h3>{entry.date}</h3>
                  <Icon name='american sign language interpreting' />
                </div>
                <p>{entry.description}</p>
                <Icon name='heart'/>
              </div>
            )
          case 'OccupationalHealthcare':
            return (
              <div style={{border: '1px solid black'}}>
                <div style={{display: 'flex'}}>
                  <h3>{entry.date}</h3>
                  <Icon name='medrt' />
                </div>
                <p>{entry.description}</p>
                <Icon name='heart'/>
              </div>
            )
          case 'HealthCheck':
            return (
              <div style={{border: '1px solid black'}}>
                <div style={{display: 'flex'}}>
                  <h3>{entry.date}</h3>
                  <Icon name='react' />
                </div>
                <p>{entry.description}</p>
                <Icon name='heart'/>
              </div>
            )
          default:
            return <p>cannot recognize entry type</p>
        }
      }

      const genderIcon = thisPatient.gender === 'male' ? <Icon name='mars' /> : <Icon name='venus' /> 
      return (
      <div>
        <div style={{display: 'flex'}}>
          <h1>{thisPatient.name}</h1>
          {genderIcon}
        </div>
        
        <p>ssn: {thisPatient.ssn}</p>
        <p>occupation: {thisPatient.occupation}</p>
        <h3>entries</h3>
        {thisPatient.entries.map((e) => <Entries entry={e}/>)}
      </div> 
    )
    }
    return (
      <h1>no patient found</h1>
    )
}

export default PatientPage