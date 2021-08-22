import { AutenticacaoService } from '../src/services/autenticacao.service'
import { RevendedorRepository } from '../src/repositories/implementations/revendedor.repository'
import { Revendedor } from '../src/domain/models/Revendedor';
import { GenPassHash } from '../src/utils/passwordUtils';

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
  const autenticacaoService = new AutenticacaoService(revendedorRepositoryMock)

  return { revendedorRepositoryMock, autenticacaoService }
}

describe('autenticacao', () => {
  it('Deve retornar sucesso ao fazer login', async () => {
    const { revendedorRepositoryMock, autenticacaoService } = sutFactory();

    revendedor.senha = GenPassHash(revendedor.senha);
    
    revendedorRepositoryMock.buscarRevendedorPorEmail.mockResolvedValueOnce(revendedor)

    const result = await autenticacaoService.login('any@email.com', 'any_pass')
    expect(revendedorRepositoryMock.buscarRevendedorPorEmail).toHaveBeenCalledTimes(1)
    expect(revendedorRepositoryMock.buscarRevendedorPorEmail).toHaveBeenCalledWith(revendedor.email)

    expect(result.body).toHaveProperty('id')
    expect(result.body).toHaveProperty('email')
    expect(result.body).toHaveProperty('cpf')
    expect(result.body).toHaveProperty('token')
  })

  it('Deve retornar erro se nao existir revendedor cadastrado com aquele email', async () => {
    const { revendedorRepositoryMock, autenticacaoService } = sutFactory();

    revendedorRepositoryMock.buscarRevendedorPorEmail.mockReturnValue(null!)
    const result = await autenticacaoService.login('any@email.com', 'any_pass')
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe('Usuário ou senha inválidos');
  })

  it('Deve retornar erro se a senha estiver errada', async () => {
    const { revendedorRepositoryMock, autenticacaoService } = sutFactory();

    revendedorRepositoryMock.buscarRevendedorPorEmail.mockResolvedValueOnce(revendedor)
    const result = await autenticacaoService.login('any@email.com', 'wrong_pass')
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe('Usuário ou senha inválidos');
  })
})