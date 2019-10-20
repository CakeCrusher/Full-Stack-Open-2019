import React from 'react'

const Query = ({onChange}) => {
    return(
        <div>
            <input placeholder="Seach countries" onChange={onChange} />
        </div>
    )
}

export default Query