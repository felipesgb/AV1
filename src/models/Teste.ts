import * as fs from "fs";
import * as path from "path";
import { ResultadoTeste } from "../enums/ResultadoTeste";
import { TipoTeste } from "../enums/TipoTeste";

export default class Teste {
  public tipo: TipoTeste;
  public resultado: ResultadoTeste;

  constructor(tipo: TipoTeste, resultado: ResultadoTeste) {
    this.tipo = tipo;
    this.resultado = resultado;
  }
  //GOAT
  public salvar(): void {
    const caminho = path.join(__dirname, "../../data/testes.json");

    let testes = [];
    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      testes = JSON.parse(conteudo);
    }

    testes.push(this);
    fs.writeFileSync(caminho, JSON.stringify(testes, null, 2));
  }

  public carregar(): any {
    const caminho = path.join(__dirname, "../../data/testes.json");

    if (fs.existsSync(caminho)) {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      return JSON.parse(conteudo);
    }
    return [];
  }
}
