# idea de la app
consiste en una pagina donde los usuarios pueden ver una lista de series y agregar a "favoritos" las que gusten.

# indice
# A- levantar la app
# B- CRUD de series
# C- explicacion sobre el frontend
# D- funcion de agregacion
# E- login para conseguir el token JWT
# F- ejemplos de validacion con JWT
# G- consultas varias a la DB

*-------------------A- levantar la app-----------------*
# back
1) de debera clonar el proyecto.
2) cd a la carpeta backend
3) ejecutar npm i para instalar las dependencis
4) completar el archivo .env con:
    a) PORT: puerto donde levantara la app
    b) URI_DB: url de la base de datos mongoDB (crear una para probar)
    c) JWT_SECRET: clave para crear el JWT
5) insertar los registros en la base mongo. en la carpeta mock hay un par de archivos.json
6) npm run dev para levantar el back.

# front
7) cd a la carpeta frontend
8) npm i para instalar dependencias
9) completar el archivo .env con:
    a) VITE_HOST: host para levantar la app (localhost)
    b) VITE_API_SERIES = api/series
    c) VITE_API_USUARIO = api/usuario
    d) VITE_PORT_BACK: puerto donde levantara la app
10) npm run dev para levantar la app
# PARA USAR EL FRONTEND, AMBOS DEBEN ESTAR LEVANTADOS

*-------------------B- CRUD de series-----------------*
# observacion 1: no llegue a implementar todas las funciones de crud en el front, pero si en el back.
# observacion 1: para probar las funciones CRUD se debera usar alguna app como postman, insomia, etc

*ejemplos para usar en postman suponinedo puerto=8091*
# Create  --guardar una serie
tipo    : POST
url     : http://localhost:8091/api/series/
body    :
        {
            "nombre": "House of Cards",
            "descripcion": "Un político ambicioso manipula su camino hacia el poder en EE.UU.",
            "generos": ["Drama", "Política"],
            "cantCapitulos": 73,
            "urlImagen": "https://static.tvmaze.com/uploads/images/original_untouched/42/106093.jpg"
        }
# Read   --obtener todas las series
tipo    : GET
url     : http://localhost:8091/api/series/

# Update  --actualizo solo la imagen(que esta mal) y la cantidad de capitulos(sumando los de la season 2)
tipo    : PATCH
url     : http://localhost:8091/api/series/
body    :
        {
            "nombre":  "El juego del calamar",
            "urlImagen": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTPJfAii50ScPLATTGXO9dMJaFI8YIZ-KZn__OAzBiPjQmj0VFw",
            "cantCapitulos": 16
        }
# Delete
tipo    : DELETE
url     : http://localhost:8091/api/series/
body:
    {
        "nombre": "Stranger Things"
    }

*-------------------C- explicacion sobre el frontend-----------------*
# ---
*por cuestion de tiempo no llegue a implementar todo en el front*
*tiene un login, el cual genera ela token jwt*
*si no se loguea, no se puede ingresar a las urls*

*en la pestaña series, se llama a getAllSeries para ver la lista completa. y si se toca el boton "añadir a favoritos, se guarda esa serie en la lista de favoritos del usuario logueado."*

*luego de añadir a favoritos(visualmente no sucede nada luego de tocar el boton), la pestaña de favoritos no se refresca automaticamente, hay que dar F5 para que se actualice. pero esto provocara que se tenga que loguear de nuevo.*
# ---

*-------------------D- funcion de agregacion-----------------*

# se calcula el promedio de capitulos de las series favoritas de un usuario.
# solo se debe ingresar el email del usuario.
para probarlo en postman:

tipo    : POST
url:    : http://localhost:8091/api/series/promedioCapitulosFavoritos
body    :
        {
            "email": "juan@example.com"
        }
        
*-------------------E- login para conseguir el token JWT-----------------*
para probar en postman:
tipo    : GET
url:    : http://localhost:8091/api/usuario/login
body    :
        {
            "email": "juan@example.com",
            "password": "12345678"
        }

*-------------------F- ejemplos de validacion con JWT-----------------*
# /promedioCapitulosFavoritos (para probar en postman)
# /favoritos (desde el frontend, si se vence el jwt, da error)

*-------------------G- consultas varias a la DB-----------------*
# obtener serie por nombre
tipo    : GET
url:    : http://localhost:8091/api/series/byNombre
body    :
        {
            "nombre": "Game of Thrones"
        }

# obtener series con al menos C capitulos
tipo    : GET
url:    : http://localhost:8091/api/series/byMinCaps
body    :
        {
            "minCaps" : 200
        }

# obtener series con un maximo x de capitulos
tipo    : GET
url:    : http://localhost:8091/api/series/byMaxCaps
body    :
        {
            "maxCaps" : 20
        }