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

**ATENÇÃO:** Todos os campos desta requisição são obrigatórios.

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

- `{ error: 'Validation failed' }`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `{ "error": "User does not exist"}`

Este erro ocorre quando o email de usuário no corpo da requisição não pode ser encotrado no banco de usuários cadastrados. Verifique se o email está correto e tente novamente.

- `{ "error": "Wrong Password" }`

Este erro ocorre quando a senha enviada no corpo da requisição não corresponde à senha cadastrada ao usuário. Verifique se a senha está correta e tente novamente.

## TODO

- [x] Inicio de Sessão
- [x] Cadastro de Alunos
- [x] Update de Alunos
- [ ] Exclusão de Alunos
- [ ] Criação de Usuários
- [x] Update de Usuários
- [ ] Exclusão de Usuários

## Licença

Este projeto é licencisado sob a licença MIT.
