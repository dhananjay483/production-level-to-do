import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import taskRoutes from './route/routes.js';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'
dotenv.config();

const app = express();
const port = process.env.PORT;

// database connection
connectDB();
// Middlewares part
app.use(cors({
  origin : "*",
  methods : ["GET","POST","DELETE","PUT"],
  allowedHeaders : ["content-type"],
  credentials : true
}));
app.use(bodyParser.json());

// default router
app.get('/', (req, res) => {
  res.send('Build Our First TO-DO-LIST');
});

// define all Tasks route 
app.use("/api/todos", taskRoutes);

app.listen(port, () => {
  console.log(` server is running on the port : ${port}`);
});
