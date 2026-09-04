const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");

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
