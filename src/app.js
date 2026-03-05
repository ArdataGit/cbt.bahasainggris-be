import express from 'express';
// reload trigger
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/api/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send('API Running');
});

export default app;
