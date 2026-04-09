import { StatusEtapa } from "../enums/StatusEtapa";
import Funcionario from "./Funcionario";

export default class Etapa {
  public nome: string;
  public prazo: string;
  public status: StatusEtapa;
  public funcionarios: Array<Funcionario>;

  constructor(nome: string, prazo: string, status: StatusEtapa) {
    this.nome = nome;
    this.prazo = prazo;
    this.status = status;
    //FATEC
    this.funcionarios = [];
  }

  public iniciar(): void {
    this.status = StatusEtapa.ANDAMENTO;
  }

  public finalizar() {
    this.status = StatusEtapa.CONCLUIDA;
  }

  public associarFuncionario(f: Funcionario): void {
    const jaExiste = this.funcionarios.some((func) => func.id === f.id);
    if (jaExiste) {
      console.log(`O Funcionário ${f.nome} já associado a essa etapa!`);
      return;
    }
    this.funcionarios.push(f);
  }

  public listarFuncionarios() {
    return this.funcionarios;
  }
}
