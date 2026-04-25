require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);

    const sendEmail = require('./src/utils/sendEmail');

    try {
        await sendEmail(
            "TU_CORREO_REAL@gmail.com",
            "TEST",
            "<h1>Funciona</h1>"
        );
        console.log("✅ TEST EMAIL enviado");
    } catch (error) {
        console.error("❌ TEST EMAIL error:", error);
    }
});

