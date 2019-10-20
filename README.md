# GYMPOINT - Backend

## Descrição do Projeto

O Gympoint é um app gerenciador de Academia. Com ele é possível gerenciar as contas e informações tanto dos usuários, quanto dos alunos.

O backend da aplicação está sendo desenvolvido em Node.js e utiliza o `express` como framework web, o `sequelize` para comunicação com o banco de dados PostgreSQL e o `jsonwebtoken` para autenticação de usuários.

### Tabela de Conteúdo

1. [Rotas](#Rotas)

- [Post](#--`POST`)
  - [1. Inicio de Sessão](####1-Inicio-de-Sessão)
  - [2. Criação de Alunos](#2-Criação-de-Alunos)
- [Post](#--`PUT`)
  - [3. Update de Alunos](#1-Update-de-Alunos)
  - [4. Update de Usuários](#2-Update-de-Usuários)

2. [Possíveis Erros](#Possíveis-Erros)

- [1. Inicio de Sessão](#1-Inicio-de-Sessão)
- [2. Criação de Alunos](#2-Criação-de-Alunos)
- [3. Update de Alunos](####3-Update-de-Alunos)
- [4. Update de Usuários](#4-Update-de-Usuários)

3. [TODO](#TODO)
4. [Licença](#Licença)

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

Caso o inicio de sessão seja aceito, a resposta conterá as seguintes informações:

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

O token gerado será solicitado para todas as requisições de `POST` e `PUT`

#### 2. Criação de Alunos

Para criar um `aluno` no banco de dados, deve ser enviada uma requisição do tipo `POST` para o endereço `http://localhost:3334/students`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Name",
  "email": "student@email.com",
  "age": 20,
  "weight": 50.5,
  "height": 150
}
```

**ATENÇÃO:** Todos os campos desta requisição são obrigatórios.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 4,
  "name": "Name",
  "email": "student@email.com",
  "age": 20,
  "weight": 50.5,
  "height": 150
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de erros em [erros na criação de alunos](#2.-Criação-de-Alunos).

### - `PUT`

#### 1. Update de Alunos

Para atualizar um `aluno` no banco de dados, deve ser enviada uma requisição do tipo `PUT` para o endereço `http://localhost:3334/students`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Name",
  "email": "student@email.com",
  "new_email": "student@newemail.com",
  "age": 21,
  "weight": 51,
  "height": 152
}
```

**ATENÇÃO:** Apenas o campo de e-mail é obrigatório, para que o aluno seja encontrado no banco de dados. Além deste campo basta enviar os campos que serão atualizados.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 4,
  "name": "Name",
  "email": "student@newemail.com",
  "age": 21,
  "weight": 51,
  "height": 152
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de [erros na atualização de alunos](####3.-Update-de-Alunos).

#### 2. Update de Usuários

Para atualizar um `usuário` no banco de dados, deve ser enviada uma requisição do tipo `PUT` para o endereço `http://localhost:3334/users`. A requisição deve enviar dentro do bearer token, o token gerado no início de sessão. O token providenciado irá identificar o usuário que será modificado. Dentro do corpo da requisição, são esperados os seguintes parâmetros:

```json
{
  "name": "Username",
  "email": "user@newemail.com",
  "oldPassword": "123456",
  "password": "1234567",
  "confirmPassword": "1234567"
}
```

**ATENÇÃO:** Nenhum campo é obrigatório. O e-mail só será necessário caso o usuário deseje atualizar seu e-mail cadastrado, não sendo necessário enviar o e-mail antigo. Caso deseje modificar a senha, o campo `"oldPassword"` é obrigatório e deve conter a senha atualmente utilizada pelo usuário, o campo`"password"` será a nova senha do usuário e a nova senha deve conter no mínimo **6 dígitos** e o campo `"confirmPassword"` deve conter a mesma senha inserida no campo `"password"` para confirmação da senha.

Caso a requsição seja aceita, a resposta conterá os seguintes dados:

```json
{
  "id": 7,
  "name": "Username",
  "user_email": "user@email.com"
}
```

Caso ocorra algum erro com a requisição, verifique na sessão de [erros na atualização de usuários](####4.-Update-de-Usuários).

## Possíveis Erros

#### 1. Início de Sessão

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `"User does not exist"`

Este erro ocorre quando o email de usuário no corpo da requisição não pode ser encotrado no banco de usuários cadastrados. Verifique se o email está correto e tente novamente.

- `"Wrong Password"`

Este erro ocorre quando a senha enviada no corpo da requisição não corresponde à senha cadastrada ao usuário. Verifique se a senha está correta e tente novamente.

#### 2. Criação de Alunos

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `"Student already exists"`

Este erro ocorre quando o e-mail que está sendo enviado para inserção já se encontra no banco de dados dos alunos. Possivelmente o `aluno` já existe ou outro `aluno` já está cadastrado usando este e-mail. Verifique o e-mail e tente novamente.

#### 3. Update de Alunos

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `User email not found`

Este erro ocorre quando o e-mail enviado para encontrar o `aluno` a ser atualizado, não corresponde a nenhum `aluno` cadastrado. Verifique se o e-mail está correto e tente novamente.

- `'E-mail already exists'`

Este erro ocorre quando o novo e-mail do `aluno` a ser atualizado, já corresponde ao e-mail de outro `aluno` já cadastrado. Utilize outro e-mail para atualizar.

#### 4. Update de Usuários

- `"Validation failed"`

Este erro ocorre quando o corpo da requisição contém algum erro, verifique se todos os campos nessessários estão presentes e se estão preenchidos corretamente.

- `'E-mail already exists'`

Este erro ocorre quando o novo e-mail do `usuário` a ser atualizado, já corresponde ao e-mail de outro `usuário` já cadastrado. Utilize outro e-mail para atualizar.

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
