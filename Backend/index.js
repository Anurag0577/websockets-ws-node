import express from 'express'
import http from 'http'
import cors from 'cors'
import { initWebsocketServer } from './webSocketSever.js';

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173', /// it is a small thing but you must not use '/' in the end of url
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

app.get('/home', (req, res) => {
    res.send('This is a hello from backend!')
})

// create a standard http server using express app
const server = http.createServer(app)

// passing this server into initWebsocketServer function
initWebsocketServer(server)

server.listen(PORT, () => {
    console.log('Backend http server started successfully!')
})