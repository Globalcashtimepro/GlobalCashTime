const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Sustituye con tu API Key real de NOWPayments
const API_KEY = 'TU_API_KEY_AQUI'; 

app.post('/create-payment', async (req, res) => {
    try {
        let { amount, currency } = req.body;

        // CORRECCIÓN: NOWPayments tiene un mínimo (aprox $10 USD). 
        // Si el monto es menor a 10, lo ajustamos para evitar la "X" roja de error.
        if (parseFloat(amount) < 15) {
            amount = "15.00"; 
        }

        const response = await axios.post(
            'https://api.nowpayments.io/v1/payment',
            {
                price_amount: amount,
                price_currency: 'usd',
                pay_currency: currency || 'usdttrx', // USDT en red TRON según tu captura
                ipn_callback_url: 'https://tu-dominio.com/callback',
                order_id: 'RG-' + Math.random().toString(36).substring(7),
                order_description: 'Compra de números'
            },
            {
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        console.error("Error detallado:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            error: "Error al crear el pago", 
            details: error.response ? error.response.data : error.message 
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
