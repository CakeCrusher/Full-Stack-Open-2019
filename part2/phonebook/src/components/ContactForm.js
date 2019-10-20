import React from 'react'

const ContactForm = ({onSubmit, onNameChange, onTelChange, nameValue, telValue}) => (
    <form onSubmit={onSubmit}>
        <div>
            Name: <input type="textbox" value={nameValue} onChange={onNameChange} />
            <br />
            Telephone: <input type="textbox" value={telValue} onChange={onTelChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default ContactForm