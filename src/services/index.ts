import { revendedorRepository, compraRepository } from '../repositories/implementations'
    
import { RevendedorService } from './revendedor.service'
import { CompraService } from './compra.service'
import { CashbackService } from './cashback.service'
import { AutenticacaoService } from './autenticacao.service'

const revendedorService = new RevendedorService(revendedorRepository)
const autenticacaoService = new AutenticacaoService(revendedorRepository);
const cashbackService = new CashbackService()
const compraService = new CompraService(revendedorService, cashbackService, compraRepository)

export { autenticacaoService, revendedorService, compraService }