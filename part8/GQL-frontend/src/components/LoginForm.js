import React, { useState } from 'react'

const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = async (event) => {
        event.preventDefault()
        const result = await props.login({
            variables: { username, password }
        })

        if (result) {
            const token = result.data.login.value
            console.log('|||LoginForm, token: ', token)
            props.setToken(token)
            localStorage.setItem('token', token)
            props.setPage('authors')
        }
    }

    if (!props.show) {
        return null
    }

    return (
        <div>
            <h1>login</h1>
            <form onSubmit={submit}>
                <div>
                    username <input
                        value={username}
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password <input
                        type="password"
                        value={password}
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm