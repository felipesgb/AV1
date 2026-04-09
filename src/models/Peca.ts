import * as fs from "fs";
import * as path from "path";
import { StatusPeca } from "../enums/StatusPeca";
import { TipoPeca } from "../enums/TipoPeca";

export default class Peca {
  public nome: string;
  public tipo: TipoPeca;
  public fornecedor: string;
  public status: StatusPeca;

  constructor(
    nome: string,
    //É
    tipo: TipoPeca,
    fornecedor: string,
    status: StatusPeca,
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.fornecedor = fornecedor;
    this.status = status;
  }

  public atualizarStatus(novoStatus: StatusPeca): void {
    this.status = novoStatus;
  }

  public salvar() {
    const caminho = path.join(__dirname, "../../data/pecas.json");

    let pecas = [];
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      pecas = JSON.parse(conteudo);
    }

    pecas.push(this);
    fs.writeFileSync(caminho, JSON.stringify(pecas, null, 2));
  }

  public carregar(): any {
    const caminho = path.join(__dirname, "../../data/pecas.json");

    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      return JSON.parse(conteudo);
    }
    return [];
  }
}
