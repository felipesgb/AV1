import * as fs from "fs";
import * as path from "path";
import { TipoAeronave } from "../enums/TipoAeronave";

export default class Aeronave {
  public codigo: string;
  public modelo: string;
  public tipo: TipoAeronave;
  public capacidade: number;
  public alcance: number;
  public pecas: any[];
  public etapas: any[];
  public testes: any[];
  //A
  constructor(
    codigo: string,
    modelo: string,
    tipo: TipoAeronave,
    capacidade: number,
    alcance: number,
  ) {
    this.codigo = codigo;
    this.modelo = modelo;
    this.tipo = tipo;
    this.capacidade = capacidade;
    this.alcance = alcance;
    this.pecas = [];
    this.etapas = [];
    this.testes = [];
  }

  public detalhes(): string {
    return `
    Detalhes da aeronave ${this.codigo}
    Modelo: ${this.modelo}
    Tipo: ${this.tipo}
    Capacidade: ${this.capacidade}
    Alcance: ${this.alcance}
    Peças: ${this.pecas.length}
    Etapas: ${this.etapas.length}
    Testes: ${this.testes.length}
    `;
  }

  public salvar(): void {
    const caminho = path.join(__dirname, "../../data/aeronaves.json");

    let aeronaves = [];
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      aeronaves = JSON.parse(conteudo);
    }

    const index = aeronaves.findIndex((a: any) => a.codigo === this.codigo);
    if (index >= 0) {
      aeronaves[index] = this;
    } else {
      aeronaves.push(this);
    }

    fs.writeFileSync(caminho, JSON.stringify(aeronaves, null, 2));
  }

  public carregar(): any {
    const caminho = path.join(__dirname, "../../data/aeronaves.json");

    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      return JSON.parse(conteudo);
    }
  }
}
