import { CompraResponse } from './compra.response';

export interface ComprasResponse {
  quantidadeVendas: number;
  porcentagemCashback: number;
  cashback: number;
  vendaTotal: number;
  compras: CompraResponse[];
}