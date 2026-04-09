import * as fs from "fs";
import * as path from "path";
import Aeronave from "./Aeronave";

export default class Relatorio {
  public conteudo: string;
  public nomeArquivo: string;

  constructor() {
    this.conteudo = "";
    this.nomeArquivo = "";
  }

  //A
  public gerarRelatorio(aeronave: Aeronave): void {
    this.nomeArquivo = `relatorio-${aeronave.codigo}.txt`;

    const pecasInfo = aeronave.pecas.length
      ? aeronave.pecas
          .map(
            (p: any) =>
              `  - ${p.nome} (${p.tipo}) - Status: ${p.status} - Fornecedor: ${p.fornecedor}`,
          )
          .join("\n")
      : "  Nenhuma peça cadastrada";

    const etapasInfo = aeronave.etapas.length
      ? aeronave.etapas
          .map(
            (e: any) =>
              `  - ${e.nome} - Status: ${e.status} - Prazo: ${e.prazo}`,
          )
          .join("\n")
      : "  Nenhuma etapa cadastrada";

    const testesInfo = aeronave.testes.length
      ? aeronave.testes
          .map((t: any) => `  - ${t.tipo}: ${t.resultado}`)
          .join("\n")
      : "  Nenhum teste registrado";

    this.conteudo = `
RELATÓRIO DA AERONAVE
Código: ${aeronave.codigo}
Modelo: ${aeronave.modelo}
Tipo: ${aeronave.tipo}
Capacidade: ${aeronave.capacidade}
Alcance: ${aeronave.alcance}
Data de emissão: ${new Date().toLocaleDateString("pt-BR")}

PEÇAS:
${pecasInfo}

ETAPAS:
${etapasInfo}

TESTES:
${testesInfo}
  `.trim();
  }

  public salvarEmArquivo(): void {
    const caminho = path.join(
      __dirname,
      "../../data/relatorios/",
      this.nomeArquivo,
    );
    fs.writeFileSync(caminho, this.conteudo, "utf-8");
    console.log(`Relatório salvo: ${this.nomeArquivo}`);
  }
}
