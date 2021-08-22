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
APP_CASHBACK_API_TOKEN=ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm

APP_AUTH_SECRET=suachave
```

## Migrations
Rode o seguinte comando para iniciar as migrations:
~~~
yarn knex:migrate
~~~

## Iniciar o servidor
Após realizar todas as instruções acima, rode o seguinte comando no seu terminal:
~~~
yarn start
~~~

## Rotas
Para as rotas de cadastro de compras, listagem e cashback acumulado, é necessário estar autenticado, passando o token jwt no header de Authorization da requisição.

## Testes
Rode o seguinte comando para rodar os testes:
~~~
yarn test
~~~

## Swagger
Para ver a documentação desta API, acesse: http://localhost:3000/docs/