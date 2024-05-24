import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import projectRoutes from './routes/projects';
import pool from './db'; // Importing the database connection

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Test the database connection
(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to PostgreSQL');
    client.release();
  } catch (err) {
    console.error('Error connecting to PostgreSQL', err);
  }
})();

// Routes
app.use('/api/projects', projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
