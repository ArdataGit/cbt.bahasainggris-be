import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import authRoutes from './modules/auth/auth.routes.js';

import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const uploadsPath = path.join(__dirname, 'public/uploads');
app.use('/api/uploads', express.static(uploadsPath));
app.use('/uploads', express.static(uploadsPath)); // Fallback for direct /uploads/ links

app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
