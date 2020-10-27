import React from 'react';
import {CoursePart} from '../types'

const Content: Function = ({allParts}: {allParts: CoursePart[]}) => {
  return allParts.map(p => {
    switch (p.name) {
      case 'Fundimentals':
        return (
          <p>
            {p.name} {p.exerciseCount} ({p.description})
          </p>
        )
      case 'Using props to pass data':
        return (
        <p>
          {p.name} {p.exerciseCount}, group projectCount: {p.groupProjectCount}
        </p>
        )
      case 'Deeper type usage':
        return (
        <p>
          {p.name} {p.exerciseCount}, submission link: <a href={p.exerciseSubmissionLink}>{p.exerciseSubmissionLink}</a>
        </p>
        )
      case 'Im special':
        return (
          <p>
            <br />
            {p.name}
            <br />
            {p.exerciseCount}
            <br />
            ({p.description})
            <br />
          </p>
        )
      default :
          const assertNever = (value: never): never => {
            throw new Error (
              `Unhandled discriminated union member: ${JSON.stringify(value)}`
            )
          }
          return assertNever(p)
    }
  })
}

export default Content;