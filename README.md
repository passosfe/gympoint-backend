# GYMPOINT - Backend

## Descrição do Projeto

O Gympoint é um app gerenciador de Academia. Com ele é possível gerenciar as contas e informações tanto dos usuários, quanto dos estudantes.

O backend da aplicação está sendo desenvolvido em Node.js e utiliza o `express` como framework web, o `sequelize` para comunicação com o banco de dados PostgreSQL e o `jsonwebtoken` para autenticação de usuários.

## Rotas

### - POST

#### 1. Inicio de Sessão

Todas as solicitações de **CRIAÇÃO** e **MODIFICAÇÃO** devem ser autenticadas com um token que é providenciado após o inicio de sessão. Para solicitar, deve ser enviada uma solicitação do tipo `POST` para o endereço: `http://localhost:3334/sessions`. No corpo da requisição, são esperadas as seguintes informações no formato JSON:

```json
{
  "email": "user@email.com",
  "password": "userpassword"
}
```
