import { CompraRepository } from '../src/repositories/implementations/compra.repository'
import { CompraService } from '../src/services/compra.service'
import { CashbackService } from '../src/services/cashback.service'
import { RevendedorRepository } from '../src/repositories/implementations/revendedor.repository'
import { RevendedorService } from '../src/services/revendedor.service'
import { Compra } from '../src/domain/models/Compra';
import { CompraDTO } from '../src/domain/DTO/compra.dto'
import { Revendedor } from '../src/domain/models/Revendedor'

jest.mock('../src/repositories/implementations/revendedor.repository');
jest.mock('../src/repositories/implementations/compra.repository')


const CompraRepositoryMock = CompraRepository as jest.Mock<CompraRepository>
const RevendedorRepositoryMock = RevendedorRepository as jest.Mock<RevendedorRepository>
const CashbackServiceMock = CashbackService as jest.Mock<CashbackService>

const compra: Compra = {
    id: 'um',
    codigo: 'any_code',
    valor: 10,
    data: 'any_data',
    status: 'any_status',
    revendedorId: 'any_id',
}

const outraCompra: Compra = {
  id: 'dois',
  codigo: 'any_code',
  valor: 10,
  data: 'any_data',
  status: 'any_status',
  revendedorId: 'any_id',
}

const revendedor: Revendedor = {
  cpf: '12345678900',
  email: 'any@email.com',
  id: 'anyid',
  nome: 'any_nome',
  senha: 'any_pass'
}


const sutFactory = () => {
  const revendedorRepositoryMock = new RevendedorRepositoryMock() as jest.Mocked<RevendedorRepository>;
  const compraRepositoryMock = new CompraRepositoryMock() as jest.Mocked<CompraRepository>;
  const cashbackServiceMock = new CashbackServiceMock() as jest.Mocked<CashbackService>
  const revendedorService = new RevendedorService(revendedorRepositoryMock)
  const cashbackService = new CashbackService()
  const compraService = new CompraService(revendedorService, cashbackService, compraRepositoryMock)

  return { compraRepositoryMock, compraService, revendedorRepositoryMock, revendedorService, cashbackServiceMock }
}

describe('compra', () => {
  it('Deve retornar sucesso ao cadastrar nova compra com cpf aprovado', async () => {
    const { compraRepositoryMock, compraService, revendedorRepositoryMock, revendedorService  } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(revendedor)

    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: '12345678900'
    }

    const cpf: string ='12345678900';

    await compraService.cadastrar(compraDTO, cpf)

    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledTimes(1)
    expect(compraRepositoryMock.cadastrar).toHaveBeenCalledTimes(1)

    //expect(result.statusCode).toBe(200);
    //expect(result.body).toBe('Revendedor cadastrado com sucesso');
  })

  it('Deve retornar sucesso ao cadastrar nova compra com outro cpf', async () => {
    const { compraRepositoryMock, compraService, revendedorRepositoryMock, revendedorService  } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(revendedor)

    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: '15350946056'
    }

    const cpf: string ='15350946056';

    await compraService.cadastrar(compraDTO, cpf)

    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledTimes(1)
    expect(compraRepositoryMock.cadastrar).toHaveBeenCalledTimes(1)

    //expect(result.statusCode).toBe(200);
    //expect(result.body).toBe('Revendedor cadastrado com sucesso');
  })

  it('Deve retornar erro ao cadastrar nova compra com cpf inexistente', async () => {
    const { compraService, revendedorRepositoryMock  } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(null!)

    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: '12345678900'
    }

    const cpf: string ='12345678900';

    const result = await compraService.cadastrar(compraDTO, cpf)

    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledTimes(1)

    expect(result.statusCode).toBe(404);
    expect(result.body).toBe('Não foi possível encontrar este revendedor');
  })

  it('Deve retornar erro ao cadastrar nova compra com cpf diferente do cpf logado', async () => {
    const { compraService, revendedorRepositoryMock  } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(null!)

    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: '12345678901'
    }

    const cpf: string ='12345678900';

    const result = await compraService.cadastrar(compraDTO, cpf)

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe('O cpf fornecido não corresponde com o cpf de seu usuário.');
  })

  it('Deve retornar cashback acumulado', async () => {
    const { compraService, revendedorRepositoryMock  } = sutFactory();
  
    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10,
      cpf: '12345678900'
    }

    const cpf: string ='12345678900';

    const result = await compraService.cashbackAcumulado(cpf)

    expect(result.statusCode).toBe(200);
  })

  it('Deve retornar erro se enviar cpf inválido', async () => {
    const { compraService, revendedorRepositoryMock  } = sutFactory();
  
    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: 'abc'
    }

    const cpf: string ='abc';

    const result = await compraService.cashbackAcumulado(cpf)

    expect(result.statusCode).toBe(400);
    expect(result.body['message']).toBe('CPF do revendedor(a) está incorreto, utilize apenas números!');
  })

  it('Deve retornar a lista de compras', async () => {
    const { compraService, revendedorRepositoryMock, compraRepositoryMock  } = sutFactory();
  
    const compraDTO: CompraDTO = {
      codigo: 'any_codigo',
      valor: 10, 
      cpf: '12345678900'
    }

    const lista: Compra[] = [{
      id: 'any_id',
      data: 'any_data',
      codigo: 'any_codigo',
      valor: 10,
      status: 'any_status',
      revendedorId: 'any_id'
    }]

    compraRepositoryMock.listar.mockResolvedValue(lista)

    const cpf: string ='12345678900';

    const result = await compraService.listar(cpf)

    expect(result.statusCode).toBe(200);
  })

  it('Deve receber a porcentagem de cashback', async () => {
    const { cashbackServiceMock  } = sutFactory();


    const porcentagem1 = cashbackServiceMock.receberPorcentagemCashback(1000)
    const porcentagem2 = cashbackServiceMock.receberPorcentagemCashback(1500)
    const porcentagem3 = cashbackServiceMock.receberPorcentagemCashback(2000)

    expect(porcentagem1).toBe(10);
    expect(porcentagem2).toBe(15);
    expect(porcentagem3).toBe(20);
  })
})