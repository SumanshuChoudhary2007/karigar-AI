require('dotenv').config({ path: '../.env' });
const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Karigar AI Server running on http://localhost:${PORT}`);
  console.log(`✨ Mock AI endpoints ready for prototype presentation`);
});
