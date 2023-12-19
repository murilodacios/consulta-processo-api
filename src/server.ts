import { fastify } from 'fastify'
import fastifyCors from '@fastify/cors'
import 'dotenv/config'
import { consultaProcesso } from './routes/consulta-processo'


const app = fastify()

app.register(fastifyCors, {
    origin: "*"
})

app.register(consultaProcesso)


app.listen({
    port: 8119,
}).then(() =>{
    console.log("Server running...")
})