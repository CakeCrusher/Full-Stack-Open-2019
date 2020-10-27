import React from 'react';
import {ContentObject} from '../types'

const Content: Function = (props: {allParts: ContentObject[]}) => {  
  return (
    <p>
      Number of exercises{" "}
      {props.allParts.reduce((t, p) => t + p.exerciseCount, 0)}
    </p>
  );
}

export default Content;