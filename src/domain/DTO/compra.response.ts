export interface CompraResponse {
  id: string;
  codigo: string;
  valor: number;
  data: string;
  status?: string;
  porcentagemCashback: number;
  cashback: number;
}