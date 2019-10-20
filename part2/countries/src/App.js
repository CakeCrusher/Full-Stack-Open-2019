import React, {useState,useEffect} from 'react';
import axios from 'axios'
import Query from './components/Query'
import CountriesList from './components/CountriesList'

function App() {
  const [ctData, setCtData] = useState([])
  const [query, setQuery] = useState('')

  const getCtData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCtData(response.data)
      })
  }
  useEffect(getCtData, [])

  const queryChange = (response) => {
    setQuery(response.target.value)
  }

  const onShow = (country) => () => {
    setQuery(country)
  }

  return (
    <>
      <Query onChange={queryChange} />
      <CountriesList query={query} data={ctData} onShow={onShow} />
    </>
  )
}

export default App;
