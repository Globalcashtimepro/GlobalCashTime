const express = require('express');
const app = express();
app.use(express.json());

// CONFIGURACIÓN AUTOMÁTICA
const API_KEY = 'DYMQ3XP-6JK4BP0-KC079W2-ZPJ7ZVA';
const IPN_SECRET = 'XBaHB0g+I1xA6QTAGkfqb1dHpQm7fxa0';

app.post('/webhook-pago', (req, res) => {
    const { payment_status, pay_amount, order_id } = req.body;

    if (payment_status === 'finished') {
        // ACTIVACIÓN DE LA RULETA (Tiempos exactos)
        setTimeout(() => { 
            console.log("Giro 1: 15s - Parada 1: 5s"); 
            setTimeout(() => { 
                console.log("Giro 2: 15s - Parada 2: 5s"); 
                setTimeout(() => { 
                    console.log("Giro 3 Final (N°3): 15s - Parada: 5s");
                    console.log("RESET AUTOMÁTICO");
                }, 20000); 
            }, 20000); 
        }, 0);
    }
    res.sendStatus(200);
});

app.listen(3000);

