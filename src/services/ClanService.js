const ClanRepository = require('../repositories/ClanRepository');

function listClans() {
    return ClanRepository.findAll();
}

module.exports = {
    listClans,
};