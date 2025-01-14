import axios from 'axios'

const API_SERIES    = 'http://localhost:8091/api/series'
const API_USUARIO   = 'http://localhost:8091/api/usuario'

const getAllSeries = async() =>{
    const response = await axios.get(API_SERIES)
    console.log(response.data)
    return response.data
}

const login = async(email, password) =>{
    console.log('datos recibidos'+ email +password)
    const response = await axios.post(`${API_USUARIO}/login`, {email, password})
    console.log(response.data)
    localStorage.setItem("usuario", JSON.stringify(response.data));

    return response.data
}

const getFavoritos = async() =>{
    const usuario = localStorage.getItem("usuario");
    const favoritos = await axios.get(`${API_SERIES}/favoritos`,usuario.favoritos)
    return res.json(favoritos)
        
}

export {getAllSeries ,getFavoritos, login}