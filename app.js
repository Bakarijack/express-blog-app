import express from 'express';
import mongoose from 'mongoose'
import userRouter from './routes/user-routes';
import blogRouter from './routes/blog-routes';
import { credentials } from './credentials';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user',userRouter)
app.use('/api/blog', blogRouter)

mongoose.connect(credentials.mongoUrlConnector)
.then(() => app.listen(port))
.then(() => console.log(`Connection successfully on port ${port}`))
.catch((err) => console.log(`connection failed : error : ${err}`));