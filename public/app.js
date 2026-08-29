const tableBody = document.getElementById('war-members-table-body');
const warMembersSection = document.getElementById('war-members-section');
const playerSearchInput = document.getElementById('player-search');
const clearPlayerSearchButton = document.getElementById('clear-player-search');
const playerSearchFeedback = document.getElementById('player-search-feedback');

const clanSearchform = document.getElementById('clan-search-form');
const clanSearchInput = document.getElementById('clan-search');
const clearClanSearchButton = document.getElementById('clear-clan-search');
const clanSearchfeedback = document.getElementById('clan-search-feedback');

let warMembers = [];

function createTableCell(value) {
    const cell = document.createElement('td');
    cell.textContent = value;

    return cell;
}

function renderWarMembers(members){
    tableBody.replaceChildren();

    members.forEach((member) => {
        const row = document.createElement('tr');

        row.append(
            createTableCell(member.name),
            createTableCell(member.battlesDone),
            createTableCell(member.battlesMissing),
            createTableCell(member.status)
        );

        tableBody.appendChild(row);
    });
}

function normalizeSearchText(value) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replaceAll('#', '')
        .trim()
        .toLocaleLowerCase();
}

function filterWarMembers() {
    const searchText = normalizeSearchText(playerSearchInput.value);

    if (searchText === '') {
        tableBody.replaceChildren();
        warMembersSection.hidden = true;
        playerSearchFeedback.textContent = '';

        return;
    }

    const filteredMembers = warMembers.filter((member) => {
        const memberName = normalizeSearchText(member.name);
        const memberTag = normalizeSearchText(member.tag);

        return (
            memberName.includes(searchText) ||
            memberTag.includes(searchText)
        );
    });

    warMembersSection.hidden = false;
    renderWarMembers(filteredMembers);

    if (filteredMembers.length === 0) {
        playerSearchFeedback.textContent = 'Nenhum jogador encontrado na GC ⚔️';

        return;
    }

    const resultText = filteredMembers.length === 1
        ? 'jogador encontrado.'
        : 'jogadores encontrados.';

    playerSearchFeedback.textContent =
        `${filteredMembers.length} ${resultText}`;
}

playerSearchInput.addEventListener('input', filterWarMembers);

clearPlayerSearchButton.addEventListener('click', () => {
    playerSearchInput.value = '';
    playerSearchFeedback.textContent = '';
    tableBody.replaceChildren();
    warMembersSection.hidden = true;
});

clanSearchform.addEventListener('submit', async (event) => {
    event.preventDefault();

    const clanTag = clanSearchInput.value.trim();

    if (clanTag === '') {
        clanSearchfeedback.textContent = 'Digite a tag do clã, tem 8 letras.';
        return;
    }

    clanSearchfeedback.textContent = 'Buscando clã...';

    await loadWarMembers(clanTag);

    clearClanSearchButton.addEventListener('click', () => {
        clanSearchInput.value = '';
        clanSearchfeedback.textContent = '';
        warMembers = [];
        tableBody.replaceChildren();
        warMembersSection.hidden = true;
    });
})

async function loadWarMembers(clanTag = '') {
    const url = clanTag
    ? `/war-members/current?clanTag=${encodeURIComponent(clanTag)}`
    : '/war-members/current';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ao buscar jogadores da GC ⚔️: ${response.status}`);
        }

        const data =await response.json();

        warMembers = Array.isArray(data)
        ? data
        : (data.members);

        warMembersSection.hidden = warMembers.length === 0;
        renderWarMembers(warMembers);

    } catch (error) {
        console.error('Erro ao carregar jogadores da GC ⚔️:', error);

        tableBody.replaceChildren();

        const row = document.createElement('tr');
        const cell = createTableCell('Não foi possível buscar jogadores da GC ⚔️');

        cell.colSpan = 4;
        row.appendChild(cell);
        tableBody.appendChild(row);
    }
}

loadWarMembers();
