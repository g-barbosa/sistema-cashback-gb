import { Request, response, Response } from 'express'
import { RequestHelper } from '../infra/helpers/http.helpers';
import { CompraService  } from '../services/compra.service';
import { logger } from '../../logger'

export class CompraController {

    constructor(
        private service: CompraService,
    ){}

    async cadastrar (request: RequestHelper, response: Response): Promise<Response> {
        try {
            const { codigo, valor, cpf, data  } = request.body
            const { cpf: cpfLogado } = request
            
            const resultado = await this.service.cadastrar({ codigo, valor, cpf, data }, cpfLogado!)

            return response.status(resultado.statusCode).send(resultado)

        } catch(err){
          logger.error(err)
          return response.status(500).json({ message: 'Houve um erro interno no servidor' })
      }
    }

    async listar(request: RequestHelper, response: Response): Promise<Response> {
      try {
        const { revendedorId } = request;
        const { mes } = request.query;
        const resultado = await this.service.listar(revendedorId, mes);
        return response.status(resultado.statusCode).send(resultado)
      } catch(err){
        logger.error(err)
        return response.status(500).json({ message: 'Houve um erro interno no servidor' })
    }
    }

    async cashbackAcumulado(request: RequestHelper, response: Response): Promise<Response> {
      try {
        const { cpf } = request;

        const resultado = await this.service.cashbackAcumulado(cpf);
        return response.status(resultado.statusCode).send(resultado)
      } catch(err){
        logger.error(err)
        return response.status(500).json({ message: 'Houve um erro interno no servidor' })
    }
    }
    
}
