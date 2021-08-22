# Sobre o projeto

Sistema de cashback. 

# Progresso

- [:heavy_check_mark:] Testes
- [:heavy_check_mark:] Autenticação
- [:heavy_check_mark:] Logs


## Dependencias
Para rodar o projeto é necessário instalar todas as dependências usando:
~~~
yarn
~~~

## Variaveis de ambiente
Antes de rodar o projeto, é necessário criar um banco de dados mysql e adicionar as variaveis de ambiente em um arquivo .env na raiz da aplicação com as seguintes propriedades:
```sh
APP_DB_HOST=localhost
APP_DB_PORT=3306
APP_DB_NAME=seubancodedados
APP_DB_USER=root
APP_DB_PASSWORD=suasenha
APP_DB_CONNECTION=mysql

APP_CASHBACK_API=https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1/cashback?cpf=

APP_AUTH_SECRET=suachave
```

## Migrations
Rode o seguinte comando para iniciar as migrations:
~~~
yarn knex:migrate
~~~

## Testes
Rode o seguinte comando para rodar os testes:
~~~
yarn test
~~~

## Swagger
To see swagger documentation access: http:localhost:8000/swagger
Para ver a documentação desta API, acesse: http://localhost:3000/docs/