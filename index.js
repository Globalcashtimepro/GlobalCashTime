const axios = require('axios');

// CONFIGURACIÓN DE TU PAGO
async function crearPagoUSDT(montoUsuario) {
    // Si el usuario pone menos de 10, el sistema lo sube a 10 para evitar errores
    const montoFinal = montoUsuario < 10 ? 10 : montoUsuario;

    const data = {
        "price_amount": montoFinal,          // Monto en USD
        "price_currency": "usd",
        "pay_currency": "usdttrc20",         // Red TRC20 (Tron)
        "fixed_rate": true,                  // BLOQUEA EL MONTO: No cambia nunca
        "is_fixed_rate": true,               // Refuerza la exactitud
        "is_fee_paid_by_user": true,         // El usuario paga la comisión, tú recibes el monto íntegro
        "ipn_callback_url": "https://global-cash-time.vercel.app/webhook-p", // Tu aviso automático
        "order_id": "PAGO_" + Date.now(),
        "order_description": "Recarga de saldo Global Cash Time"
    };

    try {
        const response = await axios.post('https://api.nowpayments.io/v1/payment', data, {
            headers: {
                'x-api-key': 'tu_api_key_de_nowpayments', // <--- PEGA TU API KEY AQUÍ
                'Content-Type': 'application/json'
            }
        });

        // Retorna el link que el usuario debe abrir para pagar
        console.log("Link de pago generado:", response.data.invoice_url);
        return response.data.invoice_url;

    } catch (error) {
        // Muestra el error exacto si algo falla en la consola
        console.error("Error al generar pago:", error.response ? error.response.data : error.message);
        return null;
    }
}

// Ejemplo de uso:
// crearPagoUSDT(10);
