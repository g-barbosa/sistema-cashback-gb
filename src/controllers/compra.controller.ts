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
            const { codigo, valor, cpf  } = request.body
            const { cpf: cpfLogado } = request
            
            await this.service.cadastrar({ codigo, valor, cpf }, cpfLogado!)

            return response.status(200).send()

        } catch(err){
          logger.error(err)
          return response.status(500).json({ message: 'Houve um erro interno no servidor' })
      }
    }

    async listar(request: RequestHelper, response: Response): Promise<Response> {
      try {
        const { revendedorId } = request;
        const { mes } = request.query;
        const compras = await this.service.listar(revendedorId, mes);
        return response.status(200).send(compras)
      } catch(err){
        logger.error(err)
        return response.status(500).json({ message: 'Houve um erro interno no servidor' })
    }
    }

    async cashbackAcumulado(request: RequestHelper, response: Response): Promise<Response> {
      try {
        const { cpf } = request;

        const result = await this.service.cashbackAcumulado(cpf);
        return response.status(result.statusCode).send(result)
      } catch(err){
        logger.error(err)
        return response.status(500).json({ message: 'Houve um erro interno no servidor' })
    }
    }
    
}
