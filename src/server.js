import app from './app.js';

const PORT = process.env.PORT || 3001;

app.listen(PORT, (err) => {
  if (err) {
    console.error(`Failed to start server on port ${PORT}:`, err.message);
  } else {
    console.log(`Server running on port ${PORT}`);
  }
});
