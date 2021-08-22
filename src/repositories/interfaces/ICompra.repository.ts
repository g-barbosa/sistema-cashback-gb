import { Compra } from "../../domain/models/Compra";

export interface ICompraRepository {
    cadastrar(compra: Compra): Promise<void>;
    listar(cpf: string): Promise<Compra[]>;
}