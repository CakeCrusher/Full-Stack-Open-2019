import { State } from "./state";
import { Patient } from "../types";

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  // const myPatient = state.patients.get('non-exitst');
  // console.log(myPatient?.name);
  
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          [action.payload.id]: action.payload,
          ...state.patients
        }
      }
    default:
      return state;
  }
};
