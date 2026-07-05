const HealthService = require("../services/HealthService");

function getHealth(req, res){
    const status = HealthService.getHealthStatus();
    return res.status(200).json(status);
}

module.exports = {
    getHealth,
};