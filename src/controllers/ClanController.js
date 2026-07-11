const ClanService = require('../services/ClanService');

function listClans(req, res) {
    const clans = ClanService.listClans();
    return res.status(200).json(clans);
}

module.exports = {
    listClans,
};