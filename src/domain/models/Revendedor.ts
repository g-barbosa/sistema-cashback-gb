import uuid from 'uuid-random';
import { GenPassHash } from '../../utils/passwordUtils'

export class Revendedor {
    public readonly id!: string;
    public nome: string;
    public cpf: string;
    public email: string;
    public senha: string;

    constructor(props: Omit<Revendedor, 'id'>, id?: string) {

        this.nome = props.nome;
        this.cpf = props.cpf;
        this.email = props.email;
        this.senha = GenPassHash(props.senha);

        if (!id) {
            this.id = uuid();
        }
    }
}