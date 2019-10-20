import React, {useState} from 'react'
import axios from 'axios'

const CountriesList = ({query, data, onShow}) => {
    
    const key = 'ENTER_KEY_HERE'

    const [weather, setWeather] = useState({
        temp: 0,
        wind: 0,
        windDir: '',
        icon: ''
    })

    const filteredData = () => (
        data.filter((country) => (
            country.name.toUpperCase().indexOf(query.toUpperCase()) >= 0
        ))
    )

    const displayList = () => {
        const filtered = filteredData()
        const dataLen = filtered.length

        if (dataLen > 10) {
            return (<p>Too many matches, specify.</p>)
        }
        else if (dataLen === 1) {
            const country = filtered[0]

            axios
                .get('http://api.weatherstack.com/current?access_key=' + key + '&query=' + country.capital)
                .then(response => (
                    setWeather({
                        temp: response.data.current.tempreature,
                        wind: response.data.current.wind_speed,
                        windDir: response.data.current.wind_dir,
                        icon: response.data.current.weather_icons[0]
                    })
                ))

            return (
                <>
                    <h1>{country.name}</h1>
                    <p>capital: {country.capital}</p>
                    <p>Pupulation: {country.population}</p>
                    <h3>Languages</h3>
                    <ul>
                        {country.languages.map((lang,i) => <li key={i}>{lang.name}</li>)}
                    </ul>
                    <img alt="alt" width="300px" src={country.flag} />
                    <h3>Weather in {country.capital}</h3>
                    <img alt="Weather icon" src={weather.icon} />
                    <p><strong>Temperature:</strong> {weather.temp} Celsius</p>
                    <p><strong>Wind:</strong> {weather.wind} kph direction {weather.windDir}</p>
                    
                </>
            )
        }
        else {
            return (
                <ul>
                    {filteredData().map((country, i) => (
                        <li key={i}>{country.name} <button onClick={onShow(country.name)}>show</button></li>
                    ))}
                </ul>
            )
        }
    }
    return (
        <>
            {displayList()}
        </>
    )
}

export default CountriesList