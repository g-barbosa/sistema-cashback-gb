import { revendedorService, compraService, autenticacaoService } from '../services'
    
import { RevendedorController } from './revendedor.controller'
import { CompraController } from './compra.controller'
import { AutenticacaoController } from './autenticacao.controller'

const revendedorController = new RevendedorController(revendedorService)
const compraController = new CompraController(compraService)
const autenticacaoController = new AutenticacaoController(autenticacaoService)


export { revendedorController, compraController, autenticacaoController }