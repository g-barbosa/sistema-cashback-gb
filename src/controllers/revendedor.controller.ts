import { Request, Response } from 'express'
import { RevendedorService  } from '../services/revendedor.service';
import { logger } from '../../logger'

export class RevendedorController {

    constructor(
        private service: RevendedorService,
    ){}

    async cadastrar (request: Request, response: Response): Promise<Response> {
        try {
            const { nome, cpf, email, senha } = request.body
            
            const resultado = await this.service.cadastrar({ nome, cpf, email, senha })

            return response.status(resultado.statusCode).send(resultado)

        } catch(err){
            logger.error(err)
            return response.status(500).json({ message: 'Houve um erro interno no servidor' })
        }
    }
    
}
