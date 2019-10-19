# GYMPOINT - Backend

## Descrição do Projeto

O Gympoint é um app gerenciador de Academia. Com ele é possível gerenciar as contas e informações tanto dos usuários, quanto dos alunos.

O backend da aplicação está sendo desenvolvido em Node.js e utiliza o `express` como framework web, o `sequelize` para comunicação com o banco de dados PostgreSQL e o `jsonwebtoken` para autenticação de usuários.

## Rotas

### - `POST`

#### 1. Inicio de Sessão

Todas as solicitações de **CRIAÇÃO** e **MODIFICAÇÃO** devem ser autenticadas com um token que é providenciado após o inicio de sessão. Para solicitar, deve ser enviada uma solicitação do tipo `POST` para o endereço: `http://localhost:3334/sessions`. No corpo da requisição, são esperadas as seguintes informações no formato JSON:

```json
{
  "email": "user@email.com",
  "password": "userpassword"
}
```

- Caso o inicio de sessão seja aceito, a resposta conterá as seguintes informações:

```json
{
  "user": {
    "id": 7,
    "name": "Username",
    "email": "user@email.com"
  },
  "token": "token"
}
```

#### 2. Criação de Alunos

### - `PUT`

#### 1. Update de Alunos

#### 2. Update de Usuários

## Possíveis Erros

#### 1. Início de Sessão

- Caso o email de usuário não corresponda a nenhum usuário cadastrado, a resposta do servidor conterá um erro do tipo `{ "error": "User does not exist"}`.

- Caso o email exista, porém a senha esteja incorreta, a resposta do servidor contera o seguinte erro: `{ "error": "Wrong Password" }`.

## TODO

## Licença

Este projeto é licencisado sob a licença MIT.
