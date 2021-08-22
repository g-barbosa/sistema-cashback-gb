import { RevendedorRepository } from '../src/repositories/implementations/revendedor.repository'
import { RevendedorService } from '../src/services/revendedor.service'
import { Revendedor } from '../src/domain/models/Revendedor';

jest.mock('../src/repositories/implementations/revendedor.repository');

const RevendedorRepositoryMock = RevendedorRepository as jest.Mock<RevendedorRepository>

const revendedor: Revendedor = {
  cpf: '12345678900',
  email: 'any@email.com',
  id: 'anyid',
  nome: 'any_nome',
  senha: 'any_pass'
}

const sutFactory = () => {
  const revendedorRepositoryMock = new RevendedorRepositoryMock() as jest.Mocked<RevendedorRepository>;
  const revendedorService = new RevendedorService(revendedorRepositoryMock)

  return { revendedorRepositoryMock, revendedorService }
}

describe('revendedor', () => {
  it('Deve retornar sucesso ao cadastrar novo revendedor', async () => {
    const { revendedorRepositoryMock, revendedorService } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(null!)

    const revendedorDTO = {
      cpf: revendedor.cpf,
      email: revendedor.email,
      nome: revendedor.nome,
      senha: revendedor.senha
    }

    const result = await revendedorService.cadastrar(revendedorDTO)

    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledTimes(1)
    expect(revendedorRepositoryMock.cadastrar).toHaveBeenCalledTimes(1)

    expect(result.statusCode).toBe(200);
    expect(result.body).toBe('Revendedor cadastrado com sucesso');
  })

  it('Deve retornar erro se ja existir revendedor cadastrado com aquele cpf', async () => {
    const { revendedorRepositoryMock, revendedorService } = sutFactory();
    
    revendedorRepositoryMock.buscarRevendedorPorCPF.mockResolvedValueOnce(revendedor)

    const revendedorDTO = {
      cpf: revendedor.cpf,
      email: revendedor.email,
      nome: revendedor.nome,
      senha: revendedor.senha
    }

    const result = await revendedorService.cadastrar(revendedorDTO)

    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledTimes(1)
    expect(revendedorRepositoryMock.buscarRevendedorPorCPF).toHaveBeenCalledWith(revendedorDTO.cpf)

    expect(result.statusCode).toBe(400);
    expect(result.body).toBe('Já existe um revendedor cadastrado com este CPF');
  })
})