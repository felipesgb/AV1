import { NivelPermissao } from "../enums/NivelPermissao";
import * as fs from "fs";
import * as path from "path";

export default class Funcionario {
  public id: string;
  public nome: string;
  public telefone: string;
  public endereco: string;
  public usuario: string;
  private senha: string;
  public nivelPermissao: NivelPermissao;

  //SJC
  constructor(
    id: string,
    nome: string,
    telefone: string,
    endereco: string,
    usuario: string,
    senha: string,
    nivelPermissao: NivelPermissao,
  ) {
    this.id = id;
    this.nome = nome;
    this.telefone = telefone;
    this.endereco = endereco;
    this.usuario = usuario;
    this.senha = senha;
    this.nivelPermissao = nivelPermissao;
  }

  public autenticar(usuario: string, senha: string): boolean {
    return this.usuario === usuario && this.senha === senha;
  }

  public salvar(): void {
    const caminho = path.join(__dirname, "../../data/funcionarios.json");

    let funcionarios = [];
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      funcionarios = JSON.parse(conteudo);
    }

    const index = funcionarios.findIndex((f: any) => f.id === this.id);
    if (index >= 0) {
      funcionarios[index] = this;
    } else {
      funcionarios.push(this);
    }

    fs.writeFileSync(caminho, JSON.stringify(funcionarios, null, 2));
  }

  public carregar(): any {
    const caminho = path.join(__dirname, "../../data/funcionarios.json");

    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      return JSON.parse(conteudo);
    }
    return [];
  }
}
