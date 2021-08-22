import { ICashbackService } from './Interfaces/ICashback.service';
import axios from 'axios'

export class CashbackService implements ICashbackService {
    private readonly baseURI = process.env.APP_CASHBACK_API
    constructor (){

    }

    public receberPorcentagemCashback(somaDasCompras: number): number {
      if (somaDasCompras <= 1000) return 10
      else if (somaDasCompras > 1000 && somaDasCompras <= 1500) return 15
      else return 20
    }

    async cashbackAcumulado(cpf: any) {
      const response = axios.get(`${this.baseURI}${cpf}`)
        .then(response => {
          return response.data;
        })

      return response;
    }

}
