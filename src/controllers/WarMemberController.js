const WarMemberService = require('../services/WarMemberService');

async function getCurrent(req, res) {
    try {
        const playerTag = req.query.playerTag || null;
        const clanTag = req.query.clanTag || null;

        const data = await WarMemberService.getCurrentWarMembers(
            playerTag,
            clanTag
        );

        return res.status(200).json(data);
    } catch (error) {
        console.error('Erro ao obter membros da guerra:', error.message);

        return res.status(500).json({ error: 'Não foi possível obter dados da Guerra de Clãs' });
    }
}

module.exports = {
    getCurrent,
};