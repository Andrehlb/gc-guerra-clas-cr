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

async function readHistory(
    filePath = historyFilePath
) {
    try {
        const fileContent = await fs.readFile(
            filePath,
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

async function writeHistory(
    history,
    filePath = historyFilePath
) {
    const directoryPath = path.dirname(filePath);

    await fs.mkdir(directoryPath, {
        recursive: true,
    });

    const temporaryFilePath = `${filePath}.tmp`;
    const fileContent = `${JSON.stringify(history, null, 2)}\n`;

    await fs.writeFile(
        temporaryFilePath,
        fileContent,
        'utf-8'
    );

    await fs.rename(
        temporaryFilePath,
        filePath
    );
}

async function synchronizeClanMembers(
    clanTag,
    members,
    observedAt = new Date().toISOString(),
    filePath = historyFilePath
) {
    if (!clanTag) {
        throw new Error(
            'Não foi possível persistir os dados dos membros, sem a tag do clã.'
        );
    }

    const history = await readHistory(filePath);

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

    await writeHistory(history, filePath);

    return members.map((member) => ({
        ...member,
        firstSeenAt:
            clanHistory.members[member.tag].firstSeenAt,
    }));
}

module.exports = {
    synchronizeClanMembers,
};
