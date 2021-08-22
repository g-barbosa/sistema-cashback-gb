import { Revendedor } from "../../domain/models/Revendedor";

export interface IRevendedorRepository {
    cadastrar(employee: Revendedor): Promise<void>;
    buscarRevendedorPorCPF(cpf: string): Promise<Revendedor>;
    buscarRevendedorPorEmail(email: string): Promise<Revendedor>;
}