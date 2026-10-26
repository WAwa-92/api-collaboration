const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth.routes');
const projectRoutes = require('./routes/projects.routes');
const errorMiddleware = require('./middlewares/error.middleware');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);

app.use(errorMiddleware);

module.exports = app;
