import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from 'mongoose';
import { Book } from './models/bookModels.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowHeaders: ['Content-Type'],
//     })
// );

// Uses the default '/' GET request to print to console
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to Mern stack tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });

