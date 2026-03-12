import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/api/uploads', express.static('src/public/uploads'));
app.use('/uploads', express.static('src/public/uploads')); // Fallback for direct /uploads/ links

app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
