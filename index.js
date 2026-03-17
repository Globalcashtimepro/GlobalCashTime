const axios = require('axios');

async function crearPagoUSDT(montoUsuario) {
    // Si el usuario pone 10, enviamos 10.50 como margen de seguridad 
    // para que JAMÁS caiga por debajo del mínimo de la red
    const montoConMargen = parseFloat(montoUsuario) + 0.50;

    const data = {
        "price_amount": montoConMargen,      // Envía 10.50 para asegurar el mínimo
        "price_currency": "usd",
        "pay_currency": "usdttrc20",         // Red TRC20
        "fixed_rate": true,                  // CONGELA EL PRECIO: No cambia
        "is_fixed_rate": true,
        "is_fee_paid_by_user": true,         // El usuario cubre la comisión
        "ipn_callback_url": "https://global-cash-time.vercel.app/webhook-p",
        "order_id": "PAGO_" + Date.now()
    };

    try {
        const response = await axios.post('https://api.nowpayments.io/v1/payment', data, {
            headers: {
                'x-api-key': 'TU_API_KEY_AQUI', // <--- PEGA TU API KEY AQUÍ
                'Content-Type': 'application/json'
            }
        });

        console.log("URL de pago sin errores:", response.data.invoice_url);
        return response.data.invoice_url;

    } catch (error) {
        console.error("Error técnico:", error.response ? error.response.data : error.message);
    }
}
