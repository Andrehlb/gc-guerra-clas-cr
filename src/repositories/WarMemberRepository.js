const fs = require('node:fs/promises');
const path = require('node:path');

const runtimeDirectoryPath = path.join(
    __dirname,
    '../../data/runtime'
);

const historyFilePath = path.join(
    runtimeDirectoryPath,
    'clanMemberHistory.json'
);

function createEmptyHistory() {
    return {
        clans: {},
    };
}

async function readHistory() {
    try {
        const fileContent = await fs.readFile(
            historyFilePath,
            'utf-8'
        );

        return JSON.parse(fileContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            return createEmptyHistory();
        }

        throw error;
    }
}

async function writeHistory(history) {
    await fs.mkdir(runtimeDirectoryPath, {
        recursive: true,
    });

    const temporaryFilePath = `${historyFilePath}.tmp`;
    const fileContent = `${JSON.stringify(history, null, 2)}\n`;

    await fs.writeFile(
        temporaryFilePath,
        fileContent,
        'utf-8'
    );

    await fs.rename(
        temporaryFilePath,
        historyFilePath
    );
}

async function synchronizeClanMembers(
    clanTag,
    members,
    observedAt = new Date().toISOString()
) {
    if (!clanTag) {
        throw new Error(
            'Não foi possível persistir os dados dos membros, sem a tag do clã.'
        );
    }

    const history = await readHistory();

    history.clans ??= {};

    history.clans[clanTag] ??= {
        members: {},
    };

    const clanHistory = history.clans[clanTag];

    for (const member of members) {
        const previousMember =
            clanHistory.members[member.tag];

        clanHistory.members[member.tag] = {
            name: member.name,
            firstSeenAt:
                previousMember?.firstSeenAt ?? observedAt,
            lastObservedAt: observedAt,
        };
    }

    await writeHistory(history);

    return members.map((member) => ({
        ...member,
        firstSeenAt:
            clanHistory.members[member.tag].firstSeenAt,
    }));
}

module.exports = {
    synchronizeClanMembers,
};
