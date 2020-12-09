// Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30 * 100;

// SEED de AUTH
process.env.SEED = process.env.SEED || 'seed-de-desarrollo';