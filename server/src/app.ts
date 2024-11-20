import express from 'express';
import dotenv from 'dotenv';
import devicesRouter from './routes/devices';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 6000;

app.use(express.json());
app.use('/registerDevice', devicesRouter); 
app.get('/', (req, res) => {
  res.send('Express server is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
