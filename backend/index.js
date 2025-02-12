import express from 'express'
import dotenv from 'dotenv'
import ConnectMongo from './db/ConnectMongo.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'
import appRoute from './routes/app.route.js';

dotenv.config();
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.disable("etag");
app.use('/v1/app', appRoute);
app.get('/', (req, res) => {
    return res.send('Hello world')
})
const port = process.env.PORT || 1234;
const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    });
}
ConnectMongo()
app.listen(port, () => {
    console.log(`Server is running at 
http://localhost:${port}`);
});