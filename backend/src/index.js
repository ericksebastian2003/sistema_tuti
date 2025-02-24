import app from './server.js'
import connection from './database.js'


connection()

app.listen(app.get('port'),()=>{
    console.log(`El servidor se está ejecutando http/localhost:${app.get('port')}`)
})


