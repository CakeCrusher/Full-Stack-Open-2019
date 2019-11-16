import React from 'react'
const LoginForm = ({
        handleSubmit,
        usernameFields, passwordFields
    }) => (
        <form onSubmit={handleSubmit}>
            <div>
                Username:
                <input {...usernameFields} />
            </div>
            <br/>
            <div>
                Password: 
                <input {...passwordFields} />
            </div>
            <br/>
            <button type="submit">Submit</button>
        </form>
    )

export default LoginForm