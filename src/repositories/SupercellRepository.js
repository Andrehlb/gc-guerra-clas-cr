const appConfig = require('../config/appConfig');

async function getCurrentRiverRace(clanTagParam) {
    const clanTagRaw = clanTagParam || appConfig.clanTag;

    if (!clanTagRaw) {
        throw new Error('Fala sério, usário não digitou a #TAG do clã correta. Ele vai ter que digitar a  #TAG certa ou a consulta não vai funcionar');
    }

    if (!appConfig.supercellApiToken) {
        throw new Error('Fala sério, o token da API da SuperCell desconfigurou ou não foi configurado corretamente. A consulta não vai funcionar');
    }

    const clanTag = encodeURIComponent(clanTagRaw);

    const url = `https://api.clashroyale.com/v1/clans/${clanTag}/currentriverrace`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${appConfig.supercellApiToken}`,
        },
    });
    console.log('Supercell HTTP:', response.status, response.statusText);
    // const errorBody = await response.clone().text();

    // console.log('Supercell resposta:', errorBody);

    if (!response.status === 401 || response.status === 403) {
        throw new Error('Falha de autuenticação na SuperCell (${response.status}).');
    }

    if (response.status === 404) {
        throw new Error('Não foi encontrado o Clã na Guerra de Clãs.');
    }

    if (response.status === 429) {
        throw new Error('Limite de requisições da API da Supercell atingido.');
    }

    if (!response.ok) {
        throw new Error('Erro na API da Supercell: HTTP ${response.status}');
    }

    const data = await response.json();

    return data;
}

async function getClanMembers(clanTagParam) {
    const clanTagRaw = clanTagParam || appConfig.clanTag;

    if (!clanTagRaw) {
        throw new Error('clanTag não informada.');
    }

    if (!appConfig.supercellApiToken) {
        throw new Error('Token da Supercell não configurado.');
    }

    const clanTag = encodeURIComponent(clanTagRaw);

    const url = `https://api.clashroyale.com/v1/clans/${clanTag}/members`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${appConfig.supercellApiToken}`,
        },
    });
    
    console.log('Supercell HTTP:', response.status, response.statusText);
    // const errorBody = await response.clone().text();

    // console.log('Supercell resposta:', errorBody);    


    if (!response.ok) {
        throw new Error(`Erro na API da Supercell: HTTP ${response.status}`);
    }

    const data = await response.json();

    return data.items || [];
}

module.exports = {
    getCurrentRiverRace,
    getClanMembers,
}
