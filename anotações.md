## Caminho

yarn add typeorm reflect-metadata

yarn add sqlite3

mkfile ormconfig

mkfile index.ts in past database

mkdir migrations 

mkdir controllers

mkflie controllers and create user controller

mkfile routes

mkdir models and create model user

refactoring controller

mkdir repositories

mkfile usersrepository in declare repositry and extends methods of typeORM

edit user controller changing for getCustomemRepository

create surveys and controller, repository and model

--

create tests

yarn add jest @types/jest -D

yarn jest --init (yes, yes, node, no, v8, yes)

in archive jest config change bail (para que pare no teste que deu errado) for true 
and testMatch path 
and preset for ts-jest

mkdir __tests__

mkfile first teste

yarn add ts-jest -D

yarn add supertest @types/supertest -D

create fake test database in archive indes.ts in past database

create environment variables NODE_ENV in scripts

change archive index.ts in past database and app.ts in past core

## Aprendizados

shift alt o = elimina as bibliotecas que eu não estou usando no arquivo

Class SobreTestesAutomatizados {
  function TestesUnitários() {
    - Para testar uma funcionalidade em específico;
    - Utilizado no TDD - Quando desenvolvemos o código direcionado aos teste, criamos 
    o serviço/funcionalidade e depois pensamos no que vai precisar, então não usamos api externas
    ou banco de dados, é voltado para criar primeiro a funcionalidade.
  };

  function TestesDeIntegração() {
    - Testa a funcionalidade completa da aplicação;
    - Testando as requisições: rotas, controllers, respositorios; 
    e a resposta: repositorio ao controller; Testando todo fluxo da funcionalidade;
  };

  function PontaAPonta(E2E) {
    - Normalmente feitos com Frontend;
    - Testa toda ação do usuário a aplicação;
    - Simula a interação do usuário;
  };
}

Class EnviandoEmail() {
  const Nodemailer = https://nodemailer.com/about/
  const SMTP Ethernal = Um serviço fake de email

  create services SENDMAIL();

  const CustomEMAIL = pra não ficar feio é usado HANDLEBARS, mkdir views e email and npsMail

  Os styles e o html ficam no arquivo, eu posso fazer o que quiser
}