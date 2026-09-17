<div align="center">

[![Português](https://img.shields.io/badge/Portugu%C3%AAs-0969DA?style=for-the-badge)](README.md)
[![English](https://img.shields.io/badge/English-0969DA?style=for-the-badge)](README.en-us.md)
[![Español](https://img.shields.io/badge/Espa%C3%B1ol-0969DA?style=for-the-badge)](README.es-419.md)
[![简体中文](https://img.shields.io/badge/%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-0969DA?style=for-the-badge)](README.zh-cn.md)

[![Profile](https://img.shields.io/badge/Profile-Andrehlb-181717?style=for-the-badge&logo=github)](https://github.com/Andrehlb)
[![Contact](https://img.shields.io/badge/Contact-Andrehlb-0A66C2?style=for-the-badge)](https://github.com/Andrehlb#contact)

</div>

# GC — Guerra de Clanes

Aplicación web para consultar y seguir la participación de los miembros de un clan en las Guerras de Clanes de Clash Royale. El backend usa Node.js con Express, consume la API oficial de Supercell y aplica las reglas de negocio de la participación en la guerra.

El proyecto nació de una necesidad real dentro de mi clan: seguir, de forma sencilla y clara, quién realizó las batallas del día y quién todavía tiene batallas pendientes.

El frontend original, desarrollado con HTML, CSS y JavaScript, sigue disponible mientras se construye gradualmente una nueva interfaz con Next.js, React y TypeScript. La migración se realiza sin transferir al frontend responsabilidades que pertenecen al backend.

## Prototipo de la nueva interfaz

La concepción visual y la definición funcional de la nueva interfaz se realizaron antes de su implementación en código, registrando la dirección adoptada para la evolución del proyecto.

**Concepción y definición funcional:** André Luiz Barbosa  
**Versión del prototipo:** 1  
**Fecha:** 11/09/2026

El diseño contempla la búsqueda pública por clan o jugador, el seguimiento de las batallas, el perfil individual, el chat del clan, temas claro y oscuro, soporte para varios idiomas y espacios publicitarios aislados del área funcional.

La búsqueda de clanes y jugadores será independiente del chat. Las búsquedas públicas no requerirán registro ni inicio de sesión. El chat será una funcionalidad autenticada: la cuenta del usuario deberá tener una `playerTag` vinculada y validada, y el acceso estará asociado al clan actual del jugador.

![Prototipo de la interfaz Royale con búsqueda, seguimiento de batallas y chat del clan](docs/images/interface-royale-layout-v1.png)

## Tecnologías y habilidades desarrolladas

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

Durante el desarrollo, se aplican y desarrollan habilidades de:

- integración con API externa;
- solicitudes HTTP e interpretación de estados;
- autenticación por token;
- programación asíncrona con `async/await` y `fetch`;
- creación de endpoints REST;
- manejo y transformación de datos;
- separación entre Routes, Controllers, Services y Repositories;
- React, Next.js, TypeScript y App Router;
- CSS Modules y diseño responsivo;
- accesibilidad de la interfaz;
- filtrado y presentación de datos en el frontend;
- configuración con variables de entorno;
- control de versiones con Git y GitHub;
- preparación y operación de infraestructura en la nube.

## Objetivo

El sistema ayuda al clan a seguir el nombre de cada jugador, cuántas batallas realizó, cuántas le quedan, el estado de su participación y si River Race está en el período de entrenamiento o de guerra.

Los datos de los miembros y de River Race se reúnen, procesan y presentan en una interfaz web, evitando que el usuario tenga que interpretar directamente las respuestas de la API.

## Funcionalidades actuales

- Consulta de la guerra actual.
- Búsqueda dinámica por tag de clan mediante `clanTag`.
- Consulta de los miembros del clan.
- Consulta de River Race actual.
- Cruce de datos mediante el tag del jugador.
- Cálculo de batallas realizadas y restantes.
- Identificación del período de entrenamiento o guerra.
- Filtro de jugadores por nombre o tag.
- Visualización de la participación de los jugadores.
- Área de contribución voluntaria mediante PIX.
- Endpoint REST para consumo del frontend.

## Nueva interfaz en desarrollo

La nueva interfaz se está construyendo en `frontend/` con Next.js, React y TypeScript.

Decisiones ya definidas:

- App Router para organizar las páginas;
- CSS Modules para los estilos;
- exportación estática a `frontend/out`;
- ningún clan debe cargarse automáticamente al abrir la página;
- ningún jugador ficticio debe aparecer como dato real;
- búsqueda pública por clan o jugador;
- temas claro y oscuro;
- soporte para varios idiomas;
- accesibilidad y diseño responsivo, con HTML semántico, labels asociados correctamente a los campos, textos alternativos para imágenes, navegación completa por teclado y foco visible, contraste adecuado, información de error/éxito que no dependa solo del color, soporte para reducción de movimiento, redimensionamiento/zoom de texto, ARIA cuando sea necesario en componentes dinámicos, mensajes de error claros, criterios WCAG y validación con Lighthouse;
- opción manual de alto contraste accesible mediante un control visual y teclado;
- posibilidad futura y complementaria de activar y desactivar el alto contraste mediante comandos de voz, siempre con una alternativa visual/teclado: el comando de voz nunca será el único medio disponible;
- si se agregan videos, audios o contenidos multimedia, se necesitarán subtítulos, transcripciones y, cuando corresponda, recursos en Libras (lengua de señas brasileña);
- perfil individual del jugador;
- futuro chat autenticado del clan;
- anuncios aislados del área funcional;
- mantenimiento del frontend anterior hasta que la nueva interfaz alcance la equivalencia funcional.

## Instalación

Requisitos previos:

- Node.js 18 o superior;
- npm;
- un token válido de la API de Supercell.

En la raíz del proyecto:

```bash
npm install
npm start
```

De manera predeterminada, el backend está disponible en:

```text
http://127.0.0.1:3000
```

El nuevo frontend tiene sus propias dependencias y proceso de build dentro de `frontend/`.

## Configuración

Crea un archivo `.env` en la raíz del proyecto. Contiene la configuración local y no debe incluirse en el control de versiones.

```env
PORT=3000
HOST=127.0.0.1
APP_NAME=GC Guerra de Clãs
APP_CONTEXT=API
SUPERCELL_API_TOKEN=
CLAN_TAG=#YVUURCPR
```

- `PORT`: puerto del servidor Express; valor predeterminado `3000`.
- `HOST`: dirección de escucha; valor predeterminado `127.0.0.1`.
- `APP_NAME`: nombre de la aplicación; valor predeterminado `GC ⚔️ Guerra de Clãs`.
- `APP_CONTEXT`: contexto mostrado por la respuesta HTML de respaldo; valor predeterminado `API`.
- `SUPERCELL_API_TOKEN`: token utilizado por el backend para autenticarse con la API de Supercell.
- `CLAN_TAG`: configuración existente en el backend. La nueva interfaz no debe usar este valor para cargar automáticamente un clan al abrir la página.

El archivo `.env` no debe incluirse en el control de versiones y el valor de `SUPERCELL_API_TOKEN` nunca debe publicarse. La clave creada en el portal de Supercell también debe autorizar la dirección IP de la máquina que ejecuta la aplicación.

## Cómo usar

En el frontend actual:

1. accede a la aplicación;
2. ingresa el tag del clan;
3. inicia la consulta de la guerra actual;
4. visualiza la lista y la participación de los jugadores;
5. si es necesario, filtra un jugador por nombre o tag.

Una nueva búsqueda de clan envía `clanTag` al backend y solicita datos actualizados a Supercell.

## Endpoints

### Participación actual en la guerra

```http
GET /war-members/current
GET /war-members/current?clanTag=%23YVUURCPR
GET /war-members/current?playerTag=%23PLAYER
```

- `clanTag` selecciona el clan consultado.
- Cuando se omite `clanTag`, el backend mantiene el comportamiento configurado actualmente.
- `%23` representa el carácter `#` codificado en la URL.
- `playerTag` permite consultar o filtrar un jugador en el endpoint.

Formato de la respuesta:

```json
{
  "clan": {
    "name": "Nombre del clan",
    "tag": "#YVUURCPR"
  },
  "members": [
    {
      "tag": "#PLAYER",
      "name": "Jugador",
      "battlesDone": 4,
      "battlesMissing": 0,
      "status": "✅ realizó todas las batallas"
    }
  ]
}
```

Otros endpoints existentes incluyen `GET /health` y `GET /clans`.

## Reglas de negocio

- Lunes, martes y miércoles corresponden al período de entrenamiento.
- Jueves, viernes, sábado y domingo corresponden al período de guerra.
- Durante la guerra, cada jugador puede usar hasta cuatro decks por día.
- El sistema calcula `battlesDone`, `battlesMissing` y un texto de `status`.
- Durante el entrenamiento no se registran batallas de guerra pendientes.

Ejemplo:

```text
Jugador       Hechas   Restantes   Estado
SwordFish          4           0   ✅ realizó todas las batallas
Fernando           3           1   ⚠️ falta 1 batalla
Jugador X          0           4   ⏳ faltan 4 batallas
```

## Integración con Supercell

Para cada consulta, el backend accede a:

```http
GET /v1/clans/{clanTag}/members
GET /v1/clans/{clanTag}/currentriverrace
```

La autenticación en la API externa se realiza por token. El repository consulta los recursos necesarios, el service cruza los datos mediante el tag del jugador y transforma el resultado en la respuesta utilizada por el frontend. El acceso externo tiene un manejo específico para los estados HTTP `401` y `403`.

## Arquitectura

Backend actual:

```text
Frontend → Routes → Controllers → Services → Repositories → API de Supercell
```

Responsabilidades:

- `Frontend`: presentación e interacción con el usuario;
- `Routes`: definición de los endpoints HTTP;
- `Controllers`: lectura de parámetros y construcción de respuestas HTTP;
- `Services`: reglas de negocio y transformación de datos;
- `Repositories`: acceso a la API de Supercell y a los datos locales.

La nueva interfaz mantiene esta separación: Next.js será responsable de la presentación, interacción, accesibilidad, diseño responsivo, temas e idiomas, mientras que Express seguirá siendo responsable de las consultas, reglas de negocio, procesamiento e integración con la API de Supercell.

## Chat del clan — arquitectura planificada

El chat todavía es una funcionalidad futura y estará separado de las búsquedas públicas.

Reglas ya definidas:

- búsqueda de clanes y jugadores sin obligación de iniciar sesión;
- registro e inicio de sesión necesarios solo para funcionalidades autenticadas, como el chat;
- `playerTag` podrá usarse en búsquedas públicas y también vincularse a la cuenta;
- el backend deberá validar la `playerTag` e identificar el clan actual del jugador;
- el usuario solo podrá acceder al chat del clan al que pertenece;
- la permanencia en el chat deberá reflejar la composición actual del clan;
- cuando el jugador abandone el clan, se deberá revocar el acceso correspondiente;
- la autenticación, autorización, sesión, moderación, almacenamiento y actualización en tiempo real se definirán antes de implementar el backend del chat.

## Uso responsable de IA en el desarrollo

Uso Inteligencia Artificial como herramienta de apoyo para el análisis, implementación, revisión, pruebas y documentación, manteniendo bajo mi responsabilidad las decisiones técnicas y el código incorporado al proyecto.

Antes de aceptar una sugerencia generada por IA, reviso su lógica, arquitectura, dependencias, manejo de errores, seguridad, impacto en el código existente y pruebas aplicables. No proporciono contraseñas, tokens, claves de API, datos personales ni otros secretos del proyecto a las herramientas de IA.

El objetivo es usar IA para aumentar la productividad y la calidad sin sustituir la comprensión del código, la revisión de código, las pruebas ni la responsabilidad del desarrollador.

## Apoya el proyecto

Si este proyecto ayuda a tu clan a seguir la participación en la guerra, puedes contribuir para mantener el sitio en línea y apoyar su evolución. La contribución es voluntaria y puede realizarse mediante el área de donaciones disponible en la propia aplicación.

## Despliegue

La arquitectura de producción utiliza Oracle Cloud Infrastructure y Nginx. El nuevo frontend se preparó para la exportación estática a `frontend/out`, manteniendo el backend Express como servicio responsable de la API y de las reglas de negocio.

La información de acceso público solo debe documentarse aquí después de validarse como parte del flujo de publicación.

## Estado actual y próximos pasos

Completado en el desarrollo de la nueva interfaz:

- validación/sincronización segura y verificación/revisión de la integridad de los cambios locales anteriores;
- eliminación de la carga automática de clanes en la interfaz;
- definición de la arquitectura con Next.js, React, TypeScript y CSS Modules;
- creación de la aplicación Next.js en `frontend/`;
- validación con ESLint y build;
- configuración de la exportación estática a `frontend/out`;
- definición y registro del prototipo visual versión 1;
- definición de los recursos visuales principales: corona, escenario del encabezado y fondo claro;
- 5.2 Guardar y revisar las imágenes: completada.
- 5.3 Verificar y optimizar los archivos: completada;
- versiones PNG y WebP de los recursos principales agregadas al proyecto;
- 6.1 Estructurar el área principal de la nueva interfaz: completada;
- ancho principal ajustado hasta `1120px`;
- estructura `main → content → section` implementada;
- validación final de la etapa con `npm run lint` y `npm run build`.

Etapa actual:

```text
Etapa 6 — Construir la interfaz en React
└── 6.2 Aplicar el fondo general de la nueva interfaz
```

Los recursos visuales principales ya están disponibles en `frontend/public/assets/`:

```text
frontend/public/assets/crown-royale-original.png
frontend/public/assets/crown-royale-original.webp
frontend/public/assets/royale-arena-hero.png
frontend/public/assets/royale-arena-hero.webp
frontend/public/assets/royale-page-background-light.png
frontend/public/assets/royale-page-background-light.webp
```

La próxima etapa aplicará el fondo general de la interfaz usando los recursos ya preparados y validados, manteniendo el diseño responsivo, la accesibilidad y la separación entre estructura y presentación.

## Contribuciones

Las sugerencias y correcciones pueden enviarse mediante issues o pull requests. No incluyas tokens, archivos `.env` ni otras credenciales.

