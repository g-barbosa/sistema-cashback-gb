import { Request, response, Response } from 'express'
import { AutenticacaoService } from '../services/autenticacao.service';
import { logger } from '../../logger'

export class AutenticacaoController {

    constructor(
        private service: AutenticacaoService,
    ){}

    async login (request: Request, response: Response): Promise<Response> {
        try {
            const { email, senha } = request.body
            
            const user = await this.service.login(email, senha)

            return response.status(200).send(user)

        } catch(err){
            logger.error(err)
            return response.status(500).json({ message: 'Houve um erro interno no servidor' })
        }
    }
    
}
