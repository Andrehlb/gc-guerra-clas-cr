function getHealthStatus() {
    return{
        status: 'ok',
        app: 'Guerra de Clãs',
        message: 'API funcionando',
        timestamp: new Date().toISOString(),
    };
}

module.exports = {
    getHealthStatus,
};