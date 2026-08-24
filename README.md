# Guerra de Clãs

Aplicação web para consultar e analisar a participação dos membros de um clã nas Guerras de Clãs do Clash Royale.

O backend é desenvolvido com Node.js e Express e consome dados reais da API oficial do Clash Royale.

## Objetivo

O sistema deve permitir acompanhar a participação dos membros do clã durante a Guerra de Clãs.

A regra principal é:

- segunda, terça e quarta: período de treinamento;
- quinta, sexta, sábado e domingo: período de guerra;
- durante a guerra, cada jogador pode utilizar até 4 decks por dia;
- o sistema informa quantas batalhas o jogador realizou, quantas restam e seu status.

Exemplo:

```text
Jogador       Fez   Restam   Status
SwordFish      4      0      ✅ fez todas as batalhas
Fernando       3      1      ⚠️ faltam 1 batalha
Jogador X      0      4      ⏳ faltam 4 batalhas
```

Nos dias de treinamento:

```text
🏋️‍♂️ dia de treino
```

não é registrada pendência de batalhas da guerra.

## Arquitetura

O backend segue uma separação em camadas:

```text
Cliente / Frontend
        ↓
      Route
        ↓
    Controller
        ↓
      Service
        ↓
    Repository
        ↓
API oficial do Clash Royale
```

### Routes

Definem os endpoints HTTP e encaminham as requisições para os controllers.

### Controllers

Recebem a requisição HTTP, interpretam parâmetros, chamam o service e devolvem a resposta.

### Services

Aplicam as regras de negócio.

No acompanhamento da guerra, o service:

- cruza os membros do clã com os participantes da River Race;
- identifica cada jogador pela `tag`;
- lê `decksUsedToday`;
- calcula batalhas realizadas e restantes;
- identifica período de treinamento ou guerra;
- gera o status apresentado ao frontend.

### Repositories

São responsáveis pelo acesso aos dados.

O `SupercellRepository` realiza as requisições HTTP para a API oficial do Clash Royale.

## Integração com a Supercell API

A aplicação consulta atualmente:

```text
GET /v1/clans/{clanTag}/members
```

para obter os membros atuais do clã.

E:

```text
GET /v1/clans/{clanTag}/currentriverrace
```

para obter os dados atuais da River Race.

Os dados retornados pela Supercell são combinados pelo backend utilizando a `tag` do jogador.

Exemplo de dados relevantes recebidos:

```json
{
  "tag": "#PLAYER",
  "name": "Jogador",
  "decksUsedToday": 4
}
```

## Endpoint de participação atual

```http
GET /war-members/current
```

Retorna os membros do clã já processados pela regra de negócio.

Exemplo:

```json
[
  {
    "tag": "#PLAYER",
    "name": "Jogador",
    "battlesDone": 4,
    "battlesMissing": 0,
    "status": "✅ fez todas as batalhas"
  }
]
```

Também é possível filtrar por `playerTag`.

## Outros endpoints

```text
GET /
GET /health
GET /clans
GET /war-members/current
```

## Configuração

As configurações são carregadas por variáveis de ambiente.

Arquivo local:

```text
.env
```

Exemplo:

```env
PORT=3000
HOST=127.0.0.1
APP_NAME=GC Guerra de Clãs
APP_CONTEXT=API
SUPERCELL_API_TOKEN=
CLAN_TAG=
```

O token da Supercell não deve ser versionado.

O projeto mantém `.env` ignorado pelo Git.

## Executando localmente

Instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Por padrão:

```text
http://127.0.0.1:3000
```

Para consultar a participação atual:

```text
http://127.0.0.1:3000/war-members/current
```

## Estado atual

Já implementado:

- backend Node.js + Express;
- configuração por variáveis de ambiente;
- arquitetura Route → Controller → Service → Repository;
- integração real com a API oficial do Clash Royale;
- consulta dos membros do clã;
- consulta da River Race atual;
- cruzamento de jogadores pela `tag`;
- cálculo de batalhas realizadas;
- cálculo de batalhas restantes;
- identificação de período de treinamento;
- endpoint `/war-members/current`;
- preparação do Express para servir arquivos da pasta `public`.

Próxima etapa:

```text
Frontend → consumir /war-members/current → apresentar os dados em uma interface web
```

## Habilidades aplicadas

Durante o desenvolvimento estão sendo praticados:

- Node.js;
- Express;
- JavaScript;
- API REST;
- integração com API externa;
- requisições HTTP;
- JSON;
- async/await;
- tratamento de erros;
- variáveis de ambiente;
- arquitetura em camadas;
- Repository Pattern;
- regras de negócio;
- transformação e combinação de dados;
- Git e GitHub.