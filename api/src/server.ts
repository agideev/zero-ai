import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Sersvidor a correr em http://localhost:${PORT}`);
  console.log(`   Endpoint: POST http://localhost:${PORT}/api/ai/chat`);
});
