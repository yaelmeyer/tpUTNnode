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
    const usuarioStorage = localStorage.getItem("usuario");
    const item =  usuarioStorage ? JSON.parse(usuarioStorage) : null;
    const response = await axios.post(`${API_SERIES}/favoritos`,{ids:item.usuario.favoritos})

    return response.data
        
}

const agregarFavorito = async(idSerie) =>{
    const usuarioStorage = localStorage.getItem("usuario");
    const item =  usuarioStorage ? JSON.parse(usuarioStorage) : null;
    await axios.post(
        `${API_USUARIO}/agregarfavorito`, 
        {favorito:idSerie, email:item.usuario.email},
        {headers:{
            'Authorization': `Bearer ${item.token}`
        }}
    )
    return
}

export {getAllSeries ,getFavoritos, login, agregarFavorito}