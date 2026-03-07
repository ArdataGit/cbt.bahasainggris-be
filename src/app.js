import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import routes from './routes/index.js';
import authRoutes from './modules/auth/auth.routes.js';

const app = express();

app.set('trust proxy', true);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('src/public'));
app.use('/uploads', express.static('src/public/uploads'));
app.use('/api/uploads', express.static('src/public/uploads'));

app.use('/api', routes);
app.use('/api/auth', authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
