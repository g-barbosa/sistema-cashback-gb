import express from 'express'
import autenticacao from '../infra/middleware/auth'
import { RequestHelper } from '../infra/helpers/http.helpers'
import { revendedorController, compraController, autenticacaoController } from '../controllers'

const routes = express.Router()

//---------------------Autenticação---------------------------

routes.post('/api/autenticacao', (request, response) => {
    /*
    #swagger.tags = ['Autenticacao']
    #swagger.description = 'Fazer login'
    #swagger.parameters['Dados do revendedor'] = {
        in: 'body',
        type: 'object',
    }
    */
    return autenticacaoController.login(request, response)
})

//---------------------Revendedor---------------------------
routes.post('/api/revendedores', (request, response) => {
    /*
    #swagger.tags = ['Revendedores']
    #swagger.description = 'Registrar um revendedor'
    #swagger.parameters['Dados do revendedor'] = {
        in: 'body',
        type: 'object',
    }
    */
    return revendedorController.cadastrar(request, response)
})

//---------------------Compra---------------------------
routes.post('/api/compras', autenticacao, (request, response) => {
    /*
    #swagger.tags = ['Compras']
    #swagger.description = 'Registrar uma compra'
    #swagger.parameters['Dados da compra'] = {
        in: 'body',
        type: 'object',
    }
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    */
    return compraController.cadastrar(request, response)
})

routes.get('/api/compras', autenticacao, (request, response) => {
    /*
    #swagger.tags = ['Compras']
    #swagger.description = 'Listar compras'
    #swagger.parameters['mes'] = {
        in: 'query',
        type: 'string',
        description: 'exemplo: 8'
    }
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    */
    return compraController.listar(request, response)
})

routes.get('/api/cashback-acumulado', autenticacao, (request, response) => {
        /*
    #swagger.tags = ['Compras']
    #swagger.description = 'Exibir acumulado de cashback'
    #swagger.security = [{
        "apiKeyAuth": []
    }]
    */
    return compraController.cashbackAcumulado(request, response)
})
export  { routes }