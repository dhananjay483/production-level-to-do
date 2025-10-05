import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './route/routes.js';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middlewares part
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Build Our First TO-DO-LIST');
});

// define all Tasks route 
app.use("/api/todos", taskRoutes);

app.listen(port, () => {
  console.log(` server is running on the port : ${port}`);
});
