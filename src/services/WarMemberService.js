const SupercellRepository = require('../repositories/SupercellRepository');

async function getCurrentWarMembers(
    playerTag = null,
    clanTag = null
) {
    const members = await SupercellRepository.getClanMembers(clanTag);
    const riverRace = await SupercellRepository.getCurrentRiverRace(clanTag);
    // console.log('periodType recebido:', riverRace?.periodType);
    const isTrainingDay = riverRace?.periodType === 'training';

    const participants = riverRace?.clan?.participants || [];

    const participantsByTag = new Map(
        participants.map((participant) => [
            participant.tag,
            participant,
        ])
    );

    const result = members.map((member) => {
        const participant = participantsByTag.get(member.tag);

        const battlesDone = Number(participant?.decksUsedToday || 0);
        const battlesMissing = isTrainingDay
            ? 0
            : Math.max(0, 4 - battlesDone);

        let status;

        if (isTrainingDay) {
            status = '🏋️‍♂️ dia de treino';
        } else if (battlesDone >= 4) {
            status = '✅ fez todas as batalhas';
        } else if (battlesDone > 0) {
            status = `⚠️ faltam ${battlesMissing} batalhas`;
        } else {
            status = '⏳ faltam 4 batalhas';
        }

        return {
            tag: member.tag,
            name: member.name,
            battlesDone,
            battlesMissing,
            status,
        };
    });

    const filteredMembers = playerTag
        ? result.filter((member) => member.tag === playerTag)
        : result;

    return {
        clan: {
            name: riverRace?.clan?.name || 'Clã não encontrado',
            tag: riverRace?.clan?.tag || clanTag,
        },
        members: filteredMembers,
    };
}

module.exports = {
    getCurrentWarMembers,
};