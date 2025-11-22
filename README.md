# Konexo -- Plataforma Web

>[!Info]
> [Link Hospedado Vercel](https://app-konexo.vercel.app/)

Repositório Front-end: https://github.com/KonexoGS/app-konexo\
Repositório API (FastAPI): https://github.com/KonexoGS/api-konexo

## Integrantes
* RM: 566256  PEDRO LUCAS ALMEIDA CUNHA
* RM: 562241  LUIS FELIPE SCACCHETTI MARIANO  
* RM: 564417  GUILHERME GODOY DOS SANTOS

## Visão Geral

O Konexo é uma plataforma projetada para conectar talentos a projetos
com propósito, utilizando uma interface moderna, gamificada e integrada
a uma API robusta construída em FastAPI.\
A aplicação é composta por dois módulos principais:

-   **Front-end (app-konexo):** interface web responsável pela
    experiência do usuário.\
-   **Back-end (api-konexo):** API RESTful que gerencia autenticação,
    usuários, projetos, interações e toda a lógica de negócios da
    plataforma.

O objetivo é tornar mais simples a colaboração em projetos open source e
facilitar a conexão entre desenvolvedores e oportunidades reais.

------------------------------------------------------------------------

## Tecnologias

### Front-end

-   TypeScript
-   React
-   Next.Js
-   Tailwind CSS
-   Integração direta com a API via Axios

### Back-end

-   Python
-   FastAPI
-   Uvicorn
-   Modelagem com Pydantic e Typing
-   Routers organizados por contexto
-   MongoDB para armazenamento dos dados
-   Api em produção hospedade em cloud da Azure

------------------------------------------------------------------------

## Estrutura do Repositório

### app-konexo (Front-end)

    /src  
      ├─ components/  
      ├─ pages/  
      ├─ services/  
      ├─ assets/  
      ├─ styles/  
      └─ ...  
    /package.json  
    /vite.config.js  

### api-konexo (Back-end)

    /app  
      ├─ main.py  
      ├─ routers/  
      ├─ models/  
      ├─ core/  
      ├─ services/  
      └─ ...  
    /requirements.txt  

------------------------------------------------------------------------

## Instalação & Execução

### Backend (api-konexo)

Acesse [o repositório para saber mais](https://github.com/KonexoGS/api-konexo)

------------------------------------------------------------------------

### Front-end (app-konexo)

``` bash
git clone https://github.com/KonexoGS/app-konexo
cd app-konexo
npm install
npm run dev
```

Acesse em:\
`http://localhost:3000` ou `https://app-konexo.vercel.app/`

------------------------------------------------------------------------

## Arquitetura & Fluxo de Dados

-   O front-end consome a API FastAPI para todas as operações.\
-   A API valida dados com Pydantic e gerencia regras de negócio.\
-   Endpoints seguem padrão REST.\
-   A comunicação entre módulos é feita via HTTP utilizando serviços
    dedicados no front-end.