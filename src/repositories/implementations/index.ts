import { RevendedorRepository } from './revendedor.repository'
import { CompraRepository } from './compra.repository';

const revendedorRepository = new RevendedorRepository()
const compraRepository = new CompraRepository()

export 
    {
        compraRepository, 
        revendedorRepository,
    }