const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const WarMemberRepository = require(
    "../src/repositories/WarMemberRepository"
);

test(
    'creates firstSeenAt and preserves it on later observations',
    async (context) => {
        let persistedContent = null;

        context.mock.method(fs, 'readFile', async () => {
            if (persistedContent === null) {
                const error = new Error('File not found');
                error.code = 'ENOENT';
                throw error;
            }

            return persistedContent;
        });

        context.mock.method(
            fs,
            'mkdir',
            async () => undefined
        );

        context.mock.method(
            fs,
            'writeFile',
            async (filePath, content) => {
                persistedContent = content;
            }
        );

        context.mock.method(
            fs,
            'rename',
            async () => undefined
        );

        const members = [
            {
                tag: '#PLAYER1',
                name: 'Jogador Teste',
            },
        ];

        const firstObservedAt = '2024-06-01T12:00:00.000Z';

        const secondObservedAt = '2026-06-02T12:00:00.000Z';

        const firstResult =
            await WarMemberRepository.synchronizeClanMembers(
                '#TEST',
                members,
                firstObservedAt
            );

        const secondResult =
            await WarMemberRepository.synchronizeClanMembers(
                '#TEST',
                members,
                secondObservedAt
            );

        const persistedHistory = JSON.parse(persistedContent);

        const persistedMember =
            persistedHistory.clans['#TEST'].members['#PLAYER1'];

        assert.equal(
            firstResult[0].firstSeenAt,
            firstObservedAt
        );

        assert.equal(
            secondResult[0].firstSeenAt,
            firstObservedAt
        );

        assert.equal(
            persistedMember.firstSeenAt,
            firstObservedAt
        );

        assert.equal(
            persistedMember.lastObservedAt,
            secondObservedAt
        );
    }
);

test(
    'writes and updates history in a real JSON file',
    async (context) => {
        const temporaryDirectoryPath = await fs.mkdtemp(
            path.join(os.tmpdir(), 'gc-war-members-')
        );

        context.after(async () => {
            await fs.rm(temporaryDirectoryPath, {
                recursive: true,
                force: true,
            });
        });

        const historyFilePath = path.join(
            temporaryDirectoryPath,
            'clanMemberHistory.json'
        );

        const members = [
            {
                tag: '#PLAYER1',
                name: 'Jogador Teste',
            },
        ];

        const firstObservedAt = '2024-06-01T12:00:00.000Z';

        await WarMemberRepository.synchronizeClanMembers(
            '#TEST',
            members,
            firstObservedAt,
            historyFilePath
        );

        const firstFileContent = await fs.readFile(
            historyFilePath,
            'utf-8'
        );

        const firstPersistedHistory = JSON.parse(
            firstFileContent
        );

        const firstPersistedMember =
            firstPersistedHistory.clans['#TEST']
                .members['#PLAYER1'];

        assert.equal(
            firstPersistedMember.firstSeenAt,
            firstObservedAt
        );

        const secondObservedAt =
            '2026-06-02T12:00:00.000Z';

        await WarMemberRepository.synchronizeClanMembers(
            '#TEST',
            members,
            secondObservedAt,
            historyFilePath
        );

        const secondFileContent = await fs.readFile(
            historyFilePath,
            'utf-8'
        );

        const secondPersistedHistory = JSON.parse(
            secondFileContent
        );

        const secondPersistedMember =
            secondPersistedHistory.clans['#TEST']
                .members['#PLAYER1'];

        assert.equal(
            secondPersistedMember.firstSeenAt,
            firstObservedAt
        );

        assert.equal(
            secondPersistedMember.lastObservedAt,
            secondObservedAt
        );

        await assert.rejects(
            fs.access(`${historyFilePath}.tmp`),
            {
                code: 'ENOENT',
            }
        );
    }
);
