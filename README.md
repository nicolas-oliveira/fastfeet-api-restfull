<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h3 align="center">
  Desafio 3: FastFeet, continuando a aplicação
</h3>

**[Acesse o original da RocketSeat aqui](https://github.com/nicolas-oliveira/bootcamp-gostack-desafio-03/tree/master/exercise)**

## Indice

- [:rocket: O que é?](#rocket-o-que-é)
- [:blue_book: Documentação](#blue_book-documentação)
	- [Tecnologias usadas](#tecnologias-usadas)
	- [Como executar](#como-executar)
		- [**Configuração do sequelize**:](#configuração-do-sequelize)
		- [**Importação do insomnia**:](#importação-do-insomnia)
		- [**Configuração das variáveis de ambiente**:](#configuração-das-variáveis-de-ambiente)
		- [****:](#)
		- [**Comando de execução**:](#comando-de-execução)
- [Models](#models)
		- [`Adm.js`](#admjs)
		- [`Delivery.js`](#deliveryjs)
		- [`Deliveryman.js`](#deliverymanjs)
		- [`File.js`](#filejs)
		- [`Recipient.js`](#recipientjs)
		- [`Report.js`](#reportjs)
- [:gear: Controllers](#gear-controllers)
		- [`AdmController.js`](#admcontrollerjs)
			- [Rotas:](#rotas)
		- [Request format:](#request-format)
		- [`AvatarController.js`](#avatarcontrollerjs)
			- [Rotas:](#rotas-1)
		- [Request format:](#request-format-1)
		- [`DeliveryController.js`](#deliverycontrollerjs)
			- [Rotas:](#rotas-2)
		- [Request format:](#request-format-2)
		- [`DeliverymanController.js`](#deliverymancontrollerjs)
		- [`FinishController.js`](#finishcontrollerjs)
		- [`ProblemController.js`](#problemcontrollerjs)
		- [`RecallController.js`](#recallcontrollerjs)
		- [`RecipientController.js`](#recipientcontrollerjs)
		- [`ReportController.js`](#reportcontrollerjs)
		- [`SessionController.js`](#sessioncontrollerjs)
- [Relacionamentos](#relacionamentos)


# :rocket: O que é?
FastFeet é uma API Restfull no qual fornece o necessário para o cadastro, acompanhamento, cancelamento e envio de emails de entregas de produtos da Empresa Fictícia FastFeet.

# :blue_book: Documentação

## Tecnologias usadas

`express` , `nodemailer` , `handlebars` , `bcrypt` , `multer` , `sequelize` e `jasonwebtoken`

## Como executar

São necessários vários processos para a configuração da aplicação. Entre eles:

### **Configuração do sequelize**:
 - `yarn sequelize db:migrate`
### **Importação do insomnia**:
 - ***[insomnia.json](./insomnia.json)***
### **Configuração das variáveis de ambiente**:
 - ******
### ****:
 - ******
### **Comando de execução**:
 - `yarn start`

# Models
### `Adm.js`

Administrador do sistema responsável pela criação atualização e remoção das tabelas **`Deliveryman`**, **`Recipients`** e **`Deliveries`**

### `Delivery.js`

Guarda os relacionamentos necessários para a administração das entregas feitas pela API pública acessada pelo **`Deliveryman`**, possibilitando o cancelamento (**`canceled_at`**) , retirada (recall como **`start-date`**) e retirada (**`end_date`** e **`signature_id`** para a foto da assinatura do cliente no final da entrega).

### `Deliveryman.js`

Entregador responsável pelas retiradas e finalizações, contém dados como **`nome`** , **`email`** , **`avatar_id`** que serão cadastrados pelo administrador.

### `File.js`

Guarda as informações necessárias do arquivo (***jpg***) para o **`avatar_id`** de **`Deliveryman`** e o **`signature_id`** de **`Delivery`** consecutivamente.

### `Recipient.js`

Contém as informações necessárias de endereço dos destinatários que solicitaram o produto.

### `Report.js`

Contém todas as notificações de problemas que é registrada na API pública acessada por **`Deliveryman`** que é relacionada à **`Delivery`** a partir de **`delivery_id`**.

# :gear: Controllers
### `AdmController.js`

Métodos: `update` e `store` responsáveis pela criação e atualização do administrador do sistema.

#### Rotas:

- `POST`: **`url/adm`**
- `PUT`: **`url/adm`**

### Request format:

**POST:**

```json
{
  "name": "name",
  "password":"password",
  "email": "email@email.com"
}
```

**PUT**:

```json
{
  "name": "name",
  "email": "email@email.com",
  "password": "12345",
  "oldPassword": "123456"
}
```


### `AvatarController.js`

Métodos: `store`, responsável pela criação do arquivo de File de **`Deliveryman`** em **`avatar_id`** e em **`File`** com **`name`** e **`path`** respectivamente.

#### Rotas:

- `POST`: **`url/deliveryman/:id/avatar/`**


### Request format:

**POST:**
```
Multipart format
```

### `DeliveryController.js`

Métodos: `index` , `store` , `update` e `delete`, responsável pela criação das Entregas

#### Rotas:

- `POST`: **`url/delivery/`**
- `PUT`: **`url/delivery/:id/`**
- `GET`: **`url/delivery/`**
- `DEL`: **`url/delivery/:id/`**


### Request format:

**POST:**
```json
{
  "recipient_id": 22,
  "deliveryman_id": 1,
  "product": "Supreme Camisa Feminino"
}
```

**PUT:**
```json
{
  "recipient_id": 22,
  "deliveryman_id": 1,
  "product": "Supreme Camisa Feminino"
}
```

**GET:**
```
No Body
```

**DELETE:**
```
No Body
```
### `DeliverymanController.js`
Métodos: `index` , `store` , `delete` e `update`, responsável pela criação dos entregadores
### `FinishController.js`
Métodos: `store`
### `ProblemController.js`
Métodos: `store`
### `RecallController.js`
Métodos: `store`
### `RecipientController.js`
Métodos: `store`
### `ReportController.js`
Métodos: `store`
### `SessionController.js`
Métodos: `store`
- `post`: **`url/session`**

# Relacionamentos

