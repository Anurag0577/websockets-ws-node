import express from 'express'
import cors from 'cors'
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

app.listen(PORT, () => {
    console.log('Backend http server started successfully!')
})