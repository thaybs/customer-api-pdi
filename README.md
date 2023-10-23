<h1 align="center">Projeto API do Plano de Desenvolvimento Individual 2023.2</h1>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
  <a href="https://github.com/thaybs/thay-pdi-api/commits/main">
  <img src="https://img.shields.io/github/last-commit/ArmynC/ArminC-AutoExec.svg?style=flat-square&logo=github&logoColor=white"
  alt="GitHub last commit"></a>
  <a href="https://github.com/thaybs/thay-pdi-api/issues">
  <img src="https://img.shields.io/github/issues-raw/ArmynC/ArminC-AutoExec.svg?style=flat-square&logo=github&logoColor=white"
  alt="GitHub issues"></a>
  <a href="https://github.com/thaybs/thay-pdi-api/pulls">
  <img src="https://img.shields.io/github/issues-pr-raw/ArmynC/ArminC-AutoExec.svg?style=flat-square&logo=github&logoColor=white"
  alt="GitHub pull requests"></a>
</p>

## 👨‍💻 Descrição

Este serviço é uma API RESTful desenvolvida em Node.js com o framework Nest.js e TypeScript. O principal objetivo é criar um sistema de gerenciamento de clientes, que inclui cadastro, validação de usuário através do Keycloak, operações de CRUD (Criar, Ler, Atualizar e Deletar) de clientes, integração com um banco de dados MongoDB e rotas autenticadas via JWT passadas pelo cabeçalho `Authorization: Bearer <token>`. Além disso, o projeto também inclui documentação Swagger para facilitar o uso e teste da API.

## 🎯 Objetivo

Este projeto de API foi desenvolvido como parte de um Plano de Desenvolvimento Individual (PDI) com o objetivo de aprimorar minhas habilidades em desenvolvimento de software e expandir meu conhecimento em tecnologias modernas de microsserviços, autenticações, protocolos e banco de dados.

## ⚙️ Instalação

```bash
$ npm install
```

## ⚙️ Imagem Docker

```bash
docker-compose up
```

## ⚡️ Rodando o app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## ⚡️ Testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Reference

### Create a customer

```http
  POST /api/customers //Cria um novo produto
```

<table>
  <thead>
    <tr>
      <th>Paramêtros</th>
      <th>Tipo</th>
      <th>Requisição</th>
      <th>Resposta</th>
      <th>Código de status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--</td>
      <td><pre>{
  name: string,
  description: string; //optional
  active: boolean;
}</pre></td>
      <td style="white-space: pre-line;">
        <pre>{ 
  name: "customer name", 
  description: "A description of the customer",  
  active: true, 
}</pre>
      <td style="white-space: pre-line;">
        <pre>
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "customer name", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  }</pre>
      <td>200 OK</td>
    </tr>
    <tr>
    <td>--</td>
      <td><pre>{
  name: string,
  description: string; //optional
  active: boolean;
}</pre></td>
      <td style="white-space: pre-line;">
        <pre>{ 
  name: "customer name", 
  description: "A description of the customer",  
  active: true, 
}</pre>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
  </pre>
      <td>403 Unauthorized</td>
    </tr>
  </tbody>
</table>

### List all customers

```http
  GET /api/customers //Busca todos os produtos existentes
```

<table>
  <thead>
    <tr>
      <th>Paramêtros</th>
      <th>Tipo</th>
      <th>Requisição</th>
      <th>Resposta</th>
      <th>Código de status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>[ 
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "customer name", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  },
  { 
    id: "8da2b069-76d2-412e-a89d-e7d31cf08e1a",
    name: "customer name foo", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "28-02-2022" 
  }
]<pre>
      </td>
      <td>200 OK</td>
    </tr>
    <tr>
      <td>--</td>
      <td>--</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
  </pre>
      <td>403 Unauthorized</td>
    </tr>
  </tbody>
</table>

### Get customer by Id

```http
  GET /api/customers/${customerId}
```

<table>
  <thead>
    <tr>
     <th>Paramêtros</th>
      <th>Tipo</th>
      <th>Requisição</th>
      <th>Resposta</th>
      <th>Código de status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "customer name", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  }</pre>
 </td>
      <td>200 OK</td>
    </tr>
     <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 404,
    "message": "Cannot GET /customers/{id}",
    "error": "Not Found"
}
  </pre>
      <td>404 Not Found</td>
    </tr>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
  </pre>
      <td>403 Unauthorized</td>
    </tr>
  </tbody>
</table>

#### Update customer by Id

```http
  PUT /api/customers/${customerId}//Atualiza os dados do produto indicado via id.
```

<table>
  <thead>
    <tr>
      <th>Paramêtros</th>
      <th>Tipo</th>
      <th>Requisição</th>
      <th>Resposta</th>
      <th>Código de status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td style="white-space: pre-line;">
        <pre>
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "updated customer", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  }</pre>
 </td>
      <td>--</td>
      <td>204 NO CONTENT</td>
    </tr><tr>
      <td>customerId</td>
      <td>string</td>
      <td style="white-space: pre-line;">
        <pre>
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "updated customer", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  }</pre>
 </td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 404,
    "message": "Cannot UPDATE /customers/{id}",
    "error": "Not Found"
}
  </pre>
      <td>404 Not Found</td>
    </tr>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td style="white-space: pre-line;">
        <pre>
  { 
    id: "f20fee7f-20bc-47fc-b2ea-14ca88a58e8b",
    name: "updated customer", 
    description: "A description of the customer",  
    active: true, 
    createdAt: "11-01-2022" 
  }</pre>
 </td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
  </pre>
      <td>403 Unauthorized</td>
    </tr>
  </tbody>
</table>

#### Delete customer by Id

```http
  DELETE /api/customers/${customerId}
```

<table>
  <thead>
    <tr>
      <th>Paramêtros</th>
      <th>Tipo</th>
      <th>Requisição</th>
      <th>Resposta</th>
      <th>Código de status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td>--</td>
      <td>204 NO CONTENT</td>
    </tr>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 404,
    "message": "Cannot DELETE /customers/{id}",
    "error": "Not Found"
}
  </pre>
      <td>404 Not Found</td>
    </tr>
    <tr>
      <td>customerId</td>
      <td>string</td>
      <td>--</td>
      <td style="white-space: pre-line;">
        <pre>
        {
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
  </pre>
      <td>403 Unauthorized</td>
    </tr>
  </tbody>
</table>

## Documentação

<ul>
    <li><strong><a href="http://google.com" target="_blank">Swagger</a></strong></li>
    <li><strong>Diagramas<p></p></a></strong></li>
</ul>

## 🌟 Resultado Final Esperado

<p><strong>Resultado Final Esperado</strong></p>
  <p>O objetivo deste projeto é desenvolver uma API robusta com as seguintes funcionalidades:</p>
  <ul>
    <li><strong>Configuração Inicial:</strong> Configuração do ambiente de desenvolvimento com Nest.js, TypeScript e MongoDB.</li>
    <li><strong>Autenticação e Autorização:</strong> Implementação da autenticação e autorização usando Keycloak, Bearer e JWT.</li>
    <li><strong>Cadastro de Produtos:</strong> Desenvolvimento do caso de uso de cadastro de produtos.</li>
    <li><strong>Validação de Dados:</strong> Garantia da validação dos dados nas operações de cadastro e atualização.</li>
    <li><strong>Testes e Qualidade de Código:</strong> Implementação de testes unitários com Jest para assegurar a qualidade do código.</li>
    <li><strong>Gestão de Erros e Logs:</strong> Tratamento de erros, definição de códigos de status HTTP e registro de logs para manutenção.</li>
    <li><strong>Operações de CRUD:</strong> Desenvolvimento das operações de leitura (get), atualização (update), listagem (list) e exclusão (delete) de produtos.</li>
    <li><strong>Documentação Completa:</strong> Criação de documentação Swagger detalhada para facilitar o uso da API.</li>
  </ul>
  <p>O resultado final será uma API completa e bem documentada, capaz de gerenciar produtos de forma segura e eficiente, atendendo aos padrões de qualidade e boas práticas de desenvolvimento.</p>

## Licença

[MIT licensed](LICENSE)

<strong>Third-party library licenses</strong>

<ul>
    <li><a href="https://www.npmjs.com/package/mongoose" target="_blank">Mongoose</a></li>
    <li><a href="https://www.npmjs.com/package/jest" target="_blank">jest</a></li>
    <li><a href="http://google.com" target="_blank">...</a></li>
    <li><a href="http://google.com" target="_blank">...</a></li>
</ul>
