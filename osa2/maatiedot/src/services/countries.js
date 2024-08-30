import axios from "axios";
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name/'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const api_key = import.meta.env.VITE_WAPI

const getAll = () => {
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
}

const getCountry = (country) => {
    return axios.get(`${baseUrl}/${country}`)

}

const getWeather = (lat,lon) => {
    return axios.get(
        `${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}`)
}

export default {
    getAll,
    getCountry,
    getWeather
}