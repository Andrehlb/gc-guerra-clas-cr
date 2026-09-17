<div align="center">

[![Português](https://img.shields.io/badge/Portugu%C3%AAs-0969DA?style=for-the-badge)](README.md)
[![English](https://img.shields.io/badge/English-0969DA?style=for-the-badge)](README.en-us.md)
[![Español](https://img.shields.io/badge/Espa%C3%B1ol-0969DA?style=for-the-badge)](README.es-419.md)
[![简体中文](https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-0969DA?style=for-the-badge)](README.zh-cn.md)

[![Profile](https://img.shields.io/badge/Profile-Andrehlb-181717?style=for-the-badge&logo=github)](https://github.com/Andrehlb)
[![Contact](https://img.shields.io/badge/Contact-Andrehlb-0A66C2?style=for-the-badge)](https://github.com/Andrehlb#contact)

</div>

# GC — Clan Wars

A web application for viewing and tracking clan member participation in Clash Royale Clan Wars. The backend uses Node.js with Express, consumes the official Supercell API, and applies the business rules for war participation.

The project grew out of a real need within my clan: to track, simply and clearly, who completed the day's battles and who still has battles remaining.

The original frontend, built with HTML, CSS, and JavaScript, remains available while a new interface is gradually built with Next.js, React, and TypeScript. The migration does not transfer backend responsibilities to the frontend.

## New Interface Prototype

The visual concept and functional definition of the new interface were created before implementation in code, documenting the direction adopted for the project's evolution.

**Concept and functional definition:** André Luiz Barbosa  
**Prototype version:** 1  
**Date:** September 11, 2026

The layout provides public clan or player search, battle tracking, individual profiles, clan chat, light and dark themes, multilingual support, and advertising spaces isolated from the functional area.

Clan and player search will be independent of chat. Public searches will not require registration or login. Chat will require authentication: the user's account must have a linked and validated `playerTag`, and access will be associated with the player's current clan.

![Royale interface prototype with search, battle tracking, and clan chat](docs/images/interface-royale-layout-v1.png)

## Technologies and Skills Developed

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=ffffff)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=ffffff)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000000)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=ffffff)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=ffffff)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css&logoColor=ffffff)
![API REST](https://img.shields.io/badge/API_REST-005571?style=for-the-badge)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=ffffff)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=ffffff)
![Oracle Cloud Infrastructure](https://img.shields.io/badge/Oracle_Cloud_Infrastructure-F80000?style=for-the-badge&logo=oracle&logoColor=ffffff)

During development, the following skills are applied and developed:

- external API integration;
- HTTP requests and status interpretation;
- token authentication;
- asynchronous programming with `async/await` and `fetch`;
- REST endpoint creation;
- data handling and transformation;
- separation between Routes, Controllers, Services, and Repositories;
- React, Next.js, TypeScript, and App Router;
- CSS Modules and responsive design;
- interface accessibility;
- frontend data filtering and presentation;
- configuration with environment variables;
- version control with Git and GitHub;
- cloud infrastructure preparation and operation.

## Purpose

The system helps the clan track each player's name, completed battles, remaining battles, participation status, and whether River Race is in the training or war period.

Member and River Race data are gathered, processed, and presented in a web interface, so users do not need to interpret API responses directly.

## Current Features

- Current war lookup.
- Dynamic clan tag search using `clanTag`.
- Clan member lookup.
- Current River Race lookup.
- Data matched by player tag.
- Completed and remaining battle calculation.
- Training or war period identification.
- Player filtering by name or tag.
- Player participation display.
- Voluntary PIX contribution area.
- REST endpoint for frontend consumption.

## New Interface in Development

The new interface is being built in `frontend/` with Next.js, React, and TypeScript.

Decisions already made:

- App Router for page organization;
- CSS Modules for styling;
- static export to `frontend/out`;
- no clan should load automatically when the page opens;
- no fictional player should appear as real data;
- public clan or player search;
- light and dark themes;
- multilingual support;
- accessibility and responsive design, with semantic HTML, labels correctly associated with fields, alternative text for images, full keyboard navigation and visible focus, adequate contrast, error/success information that does not rely on color alone, reduced motion support, text resizing/zoom, ARIA where necessary in dynamic components, clear error messages, WCAG criteria, and validation with Lighthouse;
- a manual high contrast option accessible through a visual control and keyboard;
- a future, complementary option to enable and disable high contrast through voice commands, always with a visual/keyboard alternative: voice commands will never be the only available method;
- if videos, audio, or multimedia content are added, captions, transcripts, and, where applicable, resources in Libras (Brazilian Sign Language) will be required;
- individual player profiles;
- future authenticated clan chat;
- advertisements isolated from the functional area;
- keeping the old frontend until the new interface reaches functional parity.

## Installation

Prerequisites:

- Node.js 18 or later;
- npm;
- a valid Supercell API token.

In the project root:

```bash
npm install
npm start
```

By default, the backend is available at:

```text
http://127.0.0.1:3000
```

The new frontend has its own dependencies and build process inside `frontend/`.

## Configuration

Create a `.env` file in the project root. It contains local settings and must not be versioned.

```env
PORT=3000
HOST=127.0.0.1
APP_NAME=GC Guerra de Clãs
APP_CONTEXT=API
SUPERCELL_API_TOKEN=
CLAN_TAG=#YVUURCPR
```

- `PORT`: Express server port; defaults to `3000`.
- `HOST`: listening address; defaults to `127.0.0.1`.
- `APP_NAME`: application name; defaults to `GC ⚔️ Guerra de Clãs`.
- `APP_CONTEXT`: context shown by the fallback HTML response; defaults to `API`.
- `SUPERCELL_API_TOKEN`: token used by the backend to authenticate with the Supercell API.
- `CLAN_TAG`: existing backend configuration. The new interface must not use this value to load a clan automatically when the page opens.

The `.env` file must not be versioned, and the value of `SUPERCELL_API_TOKEN` must never be published. The key created in the Supercell portal must also authorize the IP address of the machine running the application.

## How to Use

In the current frontend:

1. open the application;
2. enter the clan tag;
3. start the current war lookup;
4. view the player list and participation;
5. if necessary, filter a player by name or tag.

A new clan search sends `clanTag` to the backend and requests updated data from Supercell.

## Endpoints

### Current War Participation

```http
GET /war-members/current
GET /war-members/current?clanTag=%23YVUURCPR
GET /war-members/current?playerTag=%23PLAYER
```

- `clanTag` selects the clan to query.
- When `clanTag` is omitted, the backend retains its currently configured behavior.
- `%23` represents the URL-encoded `#` character.
- `playerTag` allows querying or filtering a player through the endpoint.

Response format:

```json
{
  "clan": {
    "name": "Clan name",
    "tag": "#YVUURCPR"
  },
  "members": [
    {
      "tag": "#PLAYER",
      "name": "Player",
      "battlesDone": 4,
      "battlesMissing": 0,
      "status": "✅ completed all battles"
    }
  ]
}
```

Other existing endpoints include `GET /health` and `GET /clans`.

## Business Rules

- Monday, Tuesday, and Wednesday are the training period.
- Thursday, Friday, Saturday, and Sunday are the war period.
- During war, each player can use up to four decks per day.
- The system calculates `battlesDone`, `battlesMissing`, and a `status` message.
- During training, no pending war battles are recorded.

Example:

```text
Player          Done   Remaining   Status
SwordFish          4           0   ✅ completed all battles
Fernando           3           1   ⚠️ 1 battle remaining
Player X           0           4   ⏳ 4 battles remaining
```

## Supercell Integration

For each lookup, the backend accesses:

```http
GET /v1/clans/{clanTag}/members
GET /v1/clans/{clanTag}/currentriverrace
```

The external API uses token authentication. The repository retrieves the required resources, and the service matches data by player tag and transforms the result into the response used by the frontend. External access includes specific handling for HTTP statuses `401` and `403`.

## Architecture

Current backend:

```text
Frontend → Routes → Controllers → Services → Repositories → Supercell API
```

Responsibilities:

- `Frontend`: presentation and user interaction;
- `Routes`: HTTP endpoint definitions;
- `Controllers`: parameter reading and response construction;
- `Services`: business rules and data transformation;
- `Repositories`: access to the Supercell API and local data.

The new interface maintains this separation: Next.js will handle presentation, interaction, accessibility, responsive design, themes, and languages, while Express will remain responsible for queries, business rules, processing, and integration with the Supercell API.

## Clan Chat — Planned Architecture

Chat is still a future feature and will be separate from public searches.

Rules already defined:

- clan and player search without requiring login;
- registration and login required only for authenticated features, such as chat;
- `playerTag` may be used in public searches and also linked to an account;
- the backend must validate `playerTag` and identify the player's current clan;
- users may only access the chat of the clan they belong to;
- continued chat access must reflect current clan membership;
- when a player leaves the clan, the corresponding access must be revoked;
- authentication, authorization, sessions, moderation, storage, and real-time updates will be defined before the chat backend is implemented.

## Responsible Use of AI in Development

I use Artificial Intelligence as a support tool for analysis, implementation, review, testing, and documentation, while retaining responsibility for technical decisions and the code incorporated into the project.

Before accepting an AI-generated suggestion, I review its logic, architecture, dependencies, error handling, security, impact on existing code, and applicable tests. I do not provide passwords, tokens, API keys, personal data, or other project secrets to AI tools.

The goal is to use AI to improve productivity and quality without replacing code comprehension, code review, testing, or developer responsibility.

## Support the Project

If this project helps your clan track war participation, you can contribute to keeping the site online and supporting its development. Contributions are voluntary and can be made through the donation area within the application.

## Deployment

The production architecture uses Oracle Cloud Infrastructure and Nginx. The new frontend has been prepared for static export to `frontend/out`, keeping the Express backend as the service responsible for the API and business rules.

Public access information should only be documented here after it has been validated as part of the publishing workflow.

## Current Status and Next Steps

Completed in the development of the new interface:

- safe validation/synchronization and integrity checking/review of previous local changes;
- removal of automatic clan loading in the interface;
- architecture definition with Next.js, React, TypeScript, and CSS Modules;
- creation of the Next.js application in `frontend/`;
- validation with ESLint and build;
- static export configuration for `frontend/out`;
- definition and documentation of visual prototype version 1;
- definition of the main visual assets: crown, header scenery, and light background;
- 5.2 Save and check the images: completed.
- 5.3 Check and optimize the files: completed;
- PNG and WebP versions of the main assets added to the project;
- 6.1 Structure the main area of the new interface: completed;
- main width adjusted to a maximum of `1120px`;
- `main → content → section` structure implemented;
- final step validation with `npm run lint` and `npm run build`.

Current step:

```text
Step 6 — Build the interface in React
└── 6.2 Apply the overall background of the new interface
```

The main visual assets are already available in `frontend/public/assets/`:

```text
frontend/public/assets/crown-royale-original.png
frontend/public/assets/crown-royale-original.webp
frontend/public/assets/royale-arena-hero.png
frontend/public/assets/royale-arena-hero.webp
frontend/public/assets/royale-page-background-light.png
frontend/public/assets/royale-page-background-light.webp
```

The next step will apply the overall interface background using the assets already prepared and validated, maintaining responsive design, accessibility, and separation between structure and presentation.

## Contributing

Suggestions and fixes can be submitted through issues or pull requests. Do not include tokens, `.env` files, or other credentials.

