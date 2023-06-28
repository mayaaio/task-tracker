import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors';
import express from 'express'
import tasks from './routes/tasks.js'

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", tasks);

app.get('/', (req, res) => {
  res.send('Hey this is my API running')
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
