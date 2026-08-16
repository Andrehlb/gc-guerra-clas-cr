# Guerra de Clãs

Aplicação web para organizar, consultar e analisar informações da Guerra de Clãs do Clash Royale.

### Esqueleto do backend

```
gc-guerra-clas-cr/
├── package.json
├── package-lock.json
├── README.md
├── public/
├── data/
│   ├── clans.json
│   └── warMembers.json
└── src/
    ├── server.js
    ├── config/
    │   └── appConfig.js
    ├── routes/
    │   ├── HealthRoutes.js
    │   ├── ClanRoutes.js
    │   ├── WarMemberRoutes.js
    │   ├── WarRoutes.js
    │   └── PlayerRoutes.js
    ├── controllers/
    │   ├── HealthController.js
    │   ├── ClanController.js
    │   ├── WarMemberController.js
    │   ├── WarController.js
    │   └── PlayerController.js
    ├── services/
    │   ├── HealthService.js
    │   ├── ClanService.js
    │   ├── WarMemberService.js
    │   ├── WarService.js
    │   └── PlayerService.js
    └── repositories/
        ├── ClanRepository.js
        ├── WarMemberRepository.js
        ├── WarRepository.js
        └── PlayerRepository.js
```

### Visão de fluxo

```
Cliente / Navegador / Front
        ↓
      Rotas
        ↓
   Controllers
        ↓
     Services
        ↓
   Repositories
        ↓
 Banco / Arquivos / API externa


Rota: GET /health
Controller: getHealth()
Service: getHealthStatus()

const HealthService = require(...)
→ importa o service

function getHealth(req, res)
→ cria a função do controller

const status = HealthService.getHealthStatus()
→ guarda o resultado da função do service
```

### Papel de cada parte no esqueleto

* **server.js**
* sobe o servidor
* carrega o Express
* conecta configs
* registra rotas
* **config/**
* guarda configurações da aplicação
* ex.: porta, host, nome da app, variáveis de ambiente
* **routes/**
* define os endpoints
* recebe URL e método HTTP
* encaminha para controller
* **controllers/**
* recebem a requisição
* leem parâmetros
* chamam service
* devolvem resposta
* **services/**
* contém a lógica da aplicação
* valida regras
* decide o que fazer
* **repositories/**
* acessam os dados
* leem/gravam em banco, JSON ou API
* **data/**
* pode guardar dados locais em JSON no começo
* útil para MVP sem banco ainda
* **public/**
* arquivos públicos/static
* HTML, CSS, JS, imagens, se houver interface web simples

##### O Fluxo Completo (A Cadeia)

Veja como o dado flui:

1. **Controller** (Recebe o pedido do usuário): "Liste os clãs!"
   * Chama: `ClanService.listClans()`
2. **Service** (Decide a regra): "Ok, vou buscar todos."
   * Chama: `ClanRepository.findAll()`
3. **Repository** (Busca a dados): "Aqui estão os dados."
   * Devolve: `clans` (o array do JSON)
4. **Service** (Recebe): Pega o array e devolve para o Controller.
5. **Controller** (Responde): Envia o array em JSON para o usuário.

## Item 2 — Regra de negócio do projeto

A regra de negócio é **o que o sistema precisa fazer para resolver o problema real do usuário**.

No meu projeto, o objetivo declarado é:

> organizar, consultar e analisar informações da Guerra de Clãs do jogo Clash Royale.

Então a regra de negócio principal pode ser definida assim:

```text
O sistema deve registrar e organizar dados de clãs, jogadores e guerras,
permitindo consultar desempenho, participação e resultados da Guerra de Clãs.
```

Na prática, preciso definir a regra de negócio a começar com estas decisões:

```text
1. Um clã possui jogadores.
2. Um jogador pertence a um clã.
3. Uma guerra possui participantes.
4. Cada jogador pode ter resultado na GC.
5. O sistema deve permitir consultar quem participou da GC.
6. O sistema deve permitir consultar desempenho na GC.
7. O sistema deve permitir analisar dados da GC do Clã pesquisado.
```

Exemplo:

```text
Clã:
- nome
- tag
- quantidade de membros

Jogador:
- nome
- tag
- nível
- clã
- participação em guerra

Guerra:
- data
- clã participante
- jogadores participantes
- resultado
- pontuação
- desempenho individual
```

Então, para este projeto, neste momento, eu classifico assim:

```text
Regra de negócio central:
Dados da Guerra de Clãs.

Regras secundárias:
Dados de clãs.
Dados de jogadores.
Dados de guerras.
Dados de participação.
Dados de desempenho.
Gerar resultados de consultas e dashboards das análises.
```

**Identificação:** para o escopo atual, o modelo melhor é usar a `tag` do jogador como identificador principal. Usar `id: 1`, `id: 2` fica artificial para o domínio do Clash Royale.

Modelo melhor para agora, sem exagerar:

```json
{
  "warConfig": {
    "season": "2026-07",
    "weeksCount": 4,
    "battlesExpectedPerWeek": 4
  },
  "members": [
    {
      "name": "Jogador Exemplo 1",
      "tag": "#PLAYER1",
      "role": "leader",
      "weeks": {
        "1": 4,
        "2": 3,
        "3": 4,
        "4": 2
      }
    },
    {
      "name": "Jogador Exemplo 2",
      "tag": "#PLAYER2",
      "role": "member",
      "weeks": {
        "1": 4,
        "2": 4,
        "3": 3,
        "4": 4
      }
    }
  ]
}
```

Esse modelo é melhor que o anterior porque:

```text
battlesExpectedPerWeek fica em um lugar só

tag vira o identificador principal

cada membro guarda só o que fez

o service calcula total, faltas e status
```

O modelo ainda mais escalável seria guardar batalha por batalha, assim:

```json
{
  "warConfig": {
    "season": "2026-07",
    "battlesExpectedPerWeek": 4
  },
  "members": [
    {
      "name": "Jogador Exemplo 1",
      "tag": "#PLAYER1",
      "role": "leader"
    }
  ],
  "battles": [
    {
      "playerTag": "#PLAYER1",
      "week": 1,
      "battleNumber": 1,
      "done": true
    },
    {
      "playerTag": "#PLAYER1",
      "week": 1,
      "battleNumber": 2,
      "done": true
    }
  ]
}
```

Mas para o seu momento atual, eu não usaria ainda o modelo de batalha bruta. Ele é melhor para sistema maduro, mas vai complicar a primeira tela.

## Item 3 — Rotas do backend

No momento, no código, tem apenas uma rota implementada:

```js
GET /
```

Ela responde uma página HTML simples dizendo que a aplicação está rodando. Isso está em `src/server.js`.

Essa rota é útil para o teste inicial, mas ainda não é uma rota de negócio.

Para o projeto **Guerra de Clãs do Clash Royale**, as rotas reais devem representar as partes principais do sistema: clãs, jogadores, guerras e análises.

A primeira versão das rotas poderia ser esta:

| Método  | Rota                       | Função                                                     |
| -------- | -------------------------- | ------------------------------------------------------------ |
| `GET`  | `/`                      | Verificar se o servidor está rodando                        |
| `GET`  | `/health`                | Verificar status técnico da API                             |
| `GET`  | `/clans`                 | Listar clãs cadastrados                                     |
| `GET`  | `/clans/:id`             | Buscar um clã específico                                   |
| `POST` | `/clans`                 | Cadastrar um clã                                            |
| `GET`  | `/war-members/summary`   | Listar membros da GC com semanas, total de batalhas e status |
| `GET`  | `/players`               | Listar jogadores                                             |
| `GET`  | `/players/:id`           | Buscar um jogador específico                                |
| `POST` | `/players`               | Cadastrar jogador                                            |
| `GET`  | `/wars`                  | Listar guerras registradas                                   |
| `GET`  | `/wars/:id`              | Buscar uma guerra específica                                |
| `POST` | `/wars`                  | Registrar uma guerra                                         |
| `GET`  | `/wars/:id/participants` | Listar participantes de uma guerra                           |
| `GET`  | `/analytics/war-summary` | Ver resumo/análise das guerras                              |

A organização em arquivos ficaria assim:

```text
src/routes/
├── HealthRoutes.js
├── ClanRoutes.js
├── WarMemberRoutes.js
├── PlayerRoutes.js
├── WarRoutes.js
└── AnalyticsRoutes.js
```

Exemplo de divisão:

```text
ClanRoutes.js
→ rotas sobre clãs

WarMemberRoutes.js
→ rota para listar participação dos membros na Guerra de Clãs
→ mostra semanas, total de batalhas e status

PlayerRoutes.js
→ rotas sobre jogadores

WarRoutes.js
→ rotas sobre guerras

AnalyticsRoutes.js
→ rotas de consulta e análise

HealthRoutes.js
→ rota técnica para saber se a API está viva
```

Então:

```text
Eu ainda não tenho rotas reais de negócio.
Tenho apenas a rota inicial "/".
O próximo passo técnico seria criar a primeira rota separada, 
provavelmente /health.
Depois viriam /clans, /players e /wars.
```

Vou começar  por `/health`, porque é simples e confirma que a arquitetura de `routes` está funcionando antes de entrar na regra de negócio.

## Item 4 — Controllers

**Controller** é a camada que recebe a requisição da rota, chama o service correto e devolve a resposta para o navegador/API.

Hoje, no meu projeto, eu ainda **não te controllers reais criados**. A rota `/` está respondendo diretamente dentro do `server.js`, ou seja, o próprio servidor está fazendo o papel que depois deveria ser separado em rota + controller.

Entendo que a ideia correta para o backend é esta:

```text
Rota recebe a URL
↓
Controller trata a requisição
↓
Service executa a regra de negócio
↓
Repository busca ou salva dados
↓
Controller devolve a resposta
```

Para o meu projeto, os controllers prováveis serão:

```text
src/controllers/
├── HealthController.js
├── ClanController.js
├── PlayerController.js
├── WarController.js
└── AnalyticsController.js
```

O meu estudo sobre o papel de cada um:

```text
HealthController
→ responde se a API está funcionando

ClanController
→ recebe pedidos sobre clãs
→ listar clãs
→ buscar clã
→ cadastrar clã

PlayerController
→ recebe pedidos sobre jogadores
→ listar jogadores
→ buscar jogador
→ cadastrar jogador

WarController
→ recebe pedidos sobre guerras
→ listar guerras
→ buscar guerra
→ registrar guerra
→ listar participantes da guerra

AnalyticsController
→ recebe pedidos de análise
→ resumo de guerra
→ desempenho dos jogadores
→ histórico do clã
```

Exemplo simples de responsabilidade:

```js
// ClanController.js
const ClanService = require("../services/ClanService");

async function listClans(req, res) {
  const clans = await ClanService.listClans();
  return res.json(clans);
}

module.exports = {
  listClans,
};
```

Entendo que o controller **não deve** conter a regra pesada do sistema. Ele não deve "decidir sozinho" cálculo de desempenho, lógica de pontuação ou análise da guerra. Isso fica no service.

## Item 5 — Services

**Service** é a camada onde fica a lógica principal do sistema.

Hoje, eu ainda não tenho services implementados. O projeto já tem Express, `.env` via `dotenv`, e servidor inicial configurado, mas a única lógica existente ainda está diretamente no `server.js`, com a rota `/` respondendo que a aplicação está rodando.

No meu projeto, os services serão responsáveis por transformar a ideia “Guerra de Clãs” em regras executáveis.

A estrutura prevista deve ser:

```text
src/services/
├── HealthService.js
├── ClanService.js
├── PlayerService.js
├── WarService.js
└── AnalyticsService.js
```

O papel de cada um:

```text
HealthService
→ verifica se a API está funcionando

ClanService
→ regras sobre clãs
→ listar clãs
→ buscar clã
→ validar nome/tag do clã
→ futuramente consultar dados do clã

PlayerService
→ regras sobre jogadores
→ listar jogadores
→ buscar jogador
→ vincular jogador a um clã
→ validar dados do jogador

WarService
→ regras sobre guerra
→ registrar guerra
→ listar guerras
→ associar jogadores participantes
→ registrar resultado da guerra

AnalyticsService
→ regras de análise
→ calcular desempenho
→ gerar resumo da guerra
→ identificar melhores jogadores
→ mostrar histórico do clã
```

Um exemplo simples:

```js
// ClanService.js
const ClanRepository = require("../repositories/ClanRepository");

function listClans() {
  return ClanRepository.findAll();
}

module.exports = {
  listClans,
};
```

Entendo que o service **não conversa diretamente com o navegador**. Quem faz isso é o controller. O service, também, **não deve depender do Express**. Ele deve receber dados, aplicar regras e devolver resultado.

Fluxo previsto:

```text
ClanRoutes.js
↓
ClanController.js
↓
ClanService.js
↓
ClanRepository.js
↓
dados
```

## Item 6 — Repositories

**Repository** é a camada responsável por acessar os dados.

No meu projeto, “repository” pode causar confusão porque existem dois sentidos:

1. **Repositório GitHub**: onde o código fica salvo. Isso já está apontado no `package.json` como `gc-guerra-clas-cr`.
2. **Repository no backend**: camada de código que busca, grava, altera ou remove dados. É este item que estou tratando agora.

Hoje, eu ainda **não tenho repositories implementados**. O `server.js` só sobe o Express e responde a rota `/`; ele ainda não chama dados, banco, arquivos JSON ou API externa.

A estrutura prevista deve ser:

```text
src/repositories/
├── ClanRepository.js
├── PlayerRepository.js
└── WarRepository.js
```

O papel de cada repository:

```text
ClanRepository
→ buscar clãs
→ buscar um clã por id/tag
→ salvar novo clã
→ atualizar dados do clã

PlayerRepository
→ buscar jogadores
→ buscar jogador por id/tag
→ salvar novo jogador
→ associar jogador a um clã

WarRepository
→ buscar guerras
→ buscar guerra por id/data
→ salvar nova guerra
→ buscar participantes de uma guerra
→ salvar resultado de guerra
```

No começo, o repository pode ler dados de arquivos JSON dentro de uma pasta `data/`.

Exemplo inicial:

```text
data/
├── clans.json
├── players.json
└── wars.json
```

Depois, quando o projeto crescer, essa mesma camada pode ser trocada para banco de dados sem destruir o resto da aplicação.

Fluxo:

```text
Controller
↓
Service
↓
Repository
↓
JSON / Banco / API externa
```

Exemplo simples de repository usando JSON:

```js
const clans = require("../../data/clans.json");

function findAll() {
  return clans;
}

module.exports = {
  findAll,
};
```

## Item 7 — Banco, dados e interface pública

Hoje, o projeto **não tem banco de dados implementado**. Olhando o `package.json`, as dependências atuais são apenas `express` e `dotenv`; não há ainda dependência de SQLite, PostgreSQL, MySQL, MongoDB ou ORM.

Também, ainda **não há camada de dados**. O servidor apenas sobe uma aplicação Express e responde a rota `/` com uma página HTML simples dizendo que a aplicação está rodando.

Para este estágio do projeto, eu vou começar com **arquivos JSON locais**, porque é mais simples para validar a arquitetura antes de colocar banco.

A estrutura inicial de dados entendo que pode ser:

```text
data/
├── clans.json
├── players.json
└── wars.json
```

O papel de cada arquivo seria:

```text
clans.json
→ dados dos clãs

players.json
→ dados dos jogadores

wars.json
→ dados das guerras
```

Exemplo de `clans.json`:

```json
[
  {
    "id": 1,
    "name": "Nome do Clã",
    "tag": "#ABC123",
    "description": "Clã principal da guerra"
  }
]
```

Exemplo de `players.json`:

```json
[
  {
    "id": 1,
    "name": "Jogador 1",
    "tag": "#PLAYER123",
    "clanId": 1,
    "role": "membro"
  }
]
```

Exemplo de `wars.json`:

```json
[
  {
    "id": 1,
    "clanId": 1,
    "date": "2026-07-03",
    "result": "em análise",
    "participants": [1]
  }
]
```

Depois, quando o projeto estiver funcionando, eu pretendo migrar para um banco real. A organização que eu entendo ser mais segura é:

```text
Fase 1: JSON local
Fase 2: SQLite
Fase 3: PostgreSQL
Fase 4: API externa do Clash Royale, se for necessário
```

Sobre a **interface pública**, hoje ela é mínima: a rota `/` devolve HTML direto dentro do `server.js`.

No futuro, vejo duas possibilidades:

```text
Opção A — API apenas
O backend responde JSON.
Um frontend separado consome a API.

Opção B — Interface pública simples
O próprio Express serve HTML, CSS e JS pela pasta public/.
```

Para o meu momento atual, eu vou escolher a opção B primeiro, usando:

```text
public/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

Assim eu consego abrir no navegador e ver algo visual sem complicar o projeto.

## **Participação dos membros na Guerra de Clãs**

```
Membro          Semana 1   Semana 2   Semana 3   Semana 4   Total   Status
Jogador A       4/4        4/4        3/4        4/4        15      fez
Jogador B       0/4        2/4        0/4        1/4        3       não fez tudo
Jogador C       0/4        0/4        0/4        0/4        0       não fez
```
