import readlineSync from "readline-sync";
import Funcionario from "./models/Funcionario";
import Aeronave from "./models/Aeronave";
import Peca from "./models/Peca";
import Etapa from "./models/Etapa";
import Teste from "./models/Teste";
import Relatorio from "./models/Relatorio";
import { NivelPermissao } from "./enums/NivelPermissao";
import { TipoAeronave } from "./enums/TipoAeronave";
import { TipoPeca } from "./enums/TipoPeca";
import { StatusPeca } from "./enums/StatusPeca";
import { StatusEtapa } from "./enums/StatusEtapa";
import { TipoTeste } from "./enums/TipoTeste";
import { ResultadoTeste } from "./enums/ResultadoTeste";

let funcionarios: Funcionario[] = [];
let aeronaves: Aeronave[] = [];
let usuarioAtual: Funcionario | null = null;

function carregarDados() {
  const dadosFuncs = new Funcionario(
    "",
    "",
    "",
    "",
    "",
    "",
    NivelPermissao.OPERADOR,
  ).carregar();
  funcionarios = dadosFuncs.map(
    (f: any) =>
      new Funcionario(
        f.id,
        f.nome,
        f.telefone,
        f.endereco,
        f.usuario,
        f.senha,
        f.nivelPermissao,
      ),
  );

  const dadosAeronaves =
    new Aeronave("", "", TipoAeronave.COMERCIAL, 0, 0).carregar() || [];
  aeronaves = dadosAeronaves.map((a: any) => {
    const aeronave = new Aeronave(
      a.codigo,
      a.modelo,
      a.tipo,
      a.capacidade,
      a.alcance,
    );
    aeronave.pecas = a.pecas || [];
    aeronave.etapas = a.etapas || [];
    aeronave.testes = a.testes || [];
    return aeronave;
  });
}

function login(): boolean {
  console.log("\nLogin:");
  const usuario = readlineSync.question("Usuario: ");
  const senha = readlineSync.question("Senha: ", { hideEchoBack: true });

  const encontrado = funcionarios.find((f) => f.autenticar(usuario, senha));
  if (encontrado) {
    usuarioAtual = encontrado;
    return true;
  }
  console.log("Usuario ou senha invalidos.");
  return false;
}

function menuAdmin() {
  let opcao: string;
  do {
    console.log("\nAerocode - admin");
    console.log("1 - Gerenciar funcionarios");
    console.log("2 - Gerenciar aeronaves");
    console.log("3 - Gerenciar pecas");
    console.log("4 - Gerenciar etapas");
    console.log("5 - Realizar testes");
    console.log("6 - Gerar relatorio");
    console.log("0 - Sair");
    opcao = readlineSync.question("Opcao: ");

    switch (opcao) {
      case "1":
        menuFuncionarios();
        break;
      case "2":
        menuAeronaves();
        break;
      case "3":
        menuPecas(true);
        break;
      case "4":
        menuEtapas(true);
        break;
      case "5":
        menuTestes();
        break;
      case "6":
        gerarRelatorio();
        break;
      case "0":
        break;
      default:
        console.log("Opcao invalida.");
    }
  } while (opcao !== "0");
}

function menuEngenheiro() {
  let opcao: string;
  do {
    console.log("\nAerocode - engenheiro");
    console.log("1 - Ver aeronaves");
    console.log("2 - Gerencias pecas");
    console.log("3 - Gerenciar etapas");
    console.log("4 - Realizar testes");
    console.log("5 - Gerar relatorio");
    console.log("0 - Sair");
    opcao = readlineSync.question("Opcao: ");

    switch (opcao) {
      case "1":
        aeronaves.length
          ? aeronaves.forEach((a) => console.log(a.detalhes()))
          : console.log("Nenhuma aeronave cadastrada.");
        break;
      case "2":
        menuPecas(true);
        break;
      case "3":
        menuEtapas(true);
        break;
      case "4":
        menuTestes();
        break;
      case "5":
        gerarRelatorio();
        break;
      case "0":
        break;
      default:
        console.log("Opcao invalida.");
    }
  } while (opcao !== "0");
}

function menuOperador() {
  let opcao: string;
  do {
    console.log("\nAeroCode - operador");
    console.log("1 - Ver aeronaves");
    console.log("2 - Atualizar status de peca");
    console.log("3 - Atualizar status de etapa");
    console.log("4 - Associar funcionario a etapa");
    console.log("0 - Sair");
    opcao = readlineSync.question("Opcao: ");

    switch (opcao) {
      case "1":
        aeronaves.length
          ? aeronaves.forEach((a) => console.log(a.detalhes()))
          : console.log("Nenhuma aeronave cadastrada.");
        break;
      case "2":
        menuPecas(false);
        break;
      case "3":
        menuEtapas(false);
        break;
      case "4":
        associarFuncionarioEtapa();
        break;
      case "0":
        break;
      default:
        console.log("Opcao invalida.");
    }
  } while (opcao !== "0");
}

function menuFuncionarios() {
  let opcao: string;
  do {
    console.log("\nFuncionarios:");
    console.log("1 - Cadastrar");
    console.log("2 - Listar");
    console.log("0 - Voltar");
    opcao = readlineSync.question("Opcao: ");

    if (opcao === "1") {
      const id = readlineSync.question("ID: ");
      const nome = readlineSync.question("Nome: ");
      const telefone = readlineSync.question("Telefone: ");
      const endereco = readlineSync.question("Endereco: ");
      const usuario = readlineSync.question("Usuario: ");
      const senha = readlineSync.question("Senha: ", { hideEchoBack: true });
      const nivelIdx = readlineSync.keyInSelect(
        Object.values(NivelPermissao),
        "Nivel:",
        { cancel: false },
      );
      const f = new Funcionario(
        id,
        nome,
        telefone,
        endereco,
        usuario,
        senha,
        Object.values(NivelPermissao)[nivelIdx],
      );
      f.salvar();
      funcionarios.push(f);
      console.log("OK.");
    }

    if (opcao === "2") {
      funcionarios.length
        ? funcionarios.forEach((f) =>
            console.log(`${f.id} - ${f.nome} (${f.nivelPermissao})`),
          )
        : console.log("Nenhum funcionario cadastrado.");
    }
  } while (opcao !== "0");
}

function menuAeronaves() {
  let opcao: string;
  do {
    console.log("\nAeronaves:");
    console.log("1 - Cadastrar");
    console.log("2 - Listar");
    console.log("0 - Voltar");
    opcao = readlineSync.question("Opcao: ");

    if (opcao === "1") {
      const codigo = readlineSync.question("Codigo: ");

      if (aeronaves.some((a) => a.codigo === codigo)) {
        console.log("Codigo ja existe.");
        continue;
      }

      const modelo = readlineSync.question("Modelo: ");
      const tipoIdx = readlineSync.keyInSelect(
        Object.values(TipoAeronave),
        "Tipo:",
        { cancel: false },
      );
      const capacidade = Number(readlineSync.question("Capacidade: "));
      const alcance = Number(readlineSync.question("Alcance: "));
      const a = new Aeronave(
        codigo,
        modelo,
        Object.values(TipoAeronave)[tipoIdx],
        capacidade,
        alcance,
      );
      a.salvar();
      aeronaves.push(a);
      console.log("OK.");
    }

    if (opcao === "2") {
      aeronaves.length
        ? aeronaves.forEach((a) => console.log(a.detalhes()))
        : console.log("Nenhuma aeronave cadastrada.");
    }
  } while (opcao !== "0");
}

function menuPecas(gerenciaTotal: boolean) {
  if (!aeronaves.length) return console.log("Cadastre uma aeronave primeiro.");
  const idx = readlineSync.keyInSelect(
    aeronaves.map((a) => a.codigo),
    "Selecione a aeronave:",
    { cancel: false },
  );
  const aeronave = aeronaves[idx];

  let opcao: string;
  do {
    console.log("\nPecas:");
    if (gerenciaTotal) {
      console.log("1 - Adicionar");
      console.log("2 - Atualizar Status");
      console.log("3 - Listar");
    } else {
      console.log("2 - Atualizar Status");
      console.log("3 - Listar");
    }
    console.log("0 - Voltar");
    opcao = readlineSync.question("Opcao: ");

    if (opcao === "1" && gerenciaTotal) {
      const nome = readlineSync.question("Nome: ");
      const tipoIdx = readlineSync.keyInSelect(
        Object.values(TipoPeca),
        "Tipo:",
        { cancel: false },
      );
      const fornecedor = readlineSync.question("Fornecedor: ");
      const statusIdx = readlineSync.keyInSelect(
        Object.values(StatusPeca),
        "Status:",
        { cancel: false },
      );
      const p = new Peca(
        nome,
        Object.values(TipoPeca)[tipoIdx],
        fornecedor,
        Object.values(StatusPeca)[statusIdx],
      );
      aeronave.pecas.push(p);
      aeronave.salvar();
      console.log("OK.");
    }

    if (opcao === "2") {
      if (!aeronave.pecas.length) {
        console.log("Nenhuma peca cadastrada.");
        continue;
      }
      const pi = readlineSync.keyInSelect(
        aeronave.pecas.map((p: any) => p.nome),
        "Peca:",
        { cancel: false },
      );
      const statusIdx = readlineSync.keyInSelect(
        Object.values(StatusPeca),
        "Novo status:",
        { cancel: false },
      );
      aeronave.pecas[pi].status = Object.values(StatusPeca)[statusIdx];
      aeronave.salvar();
      console.log("OK.");
    }

    if (opcao === "3") {
      aeronave.pecas.length
        ? aeronave.pecas.forEach((p: any) =>
            console.log(`${p.nome} - ${p.tipo} (${p.status})`),
          )
        : console.log("Nenhuma peca cadastrada.");
    }
  } while (opcao !== "0");
}

function menuEtapas(gerenciaTotal: boolean) {
  if (!aeronaves.length) return console.log("Cadastre uma aeronave primeiro.");
  const idx = readlineSync.keyInSelect(
    aeronaves.map((a) => a.codigo),
    "Selecione a aeronave:",
    { cancel: false },
  );
  const aeronave = aeronaves[idx];

  let opcao: string;
  do {
    console.log("\nEtapas:");
    if (gerenciaTotal) console.log("1 - Adicionar");
    console.log("2 - Iniciar");
    console.log("3 - Finalizar");
    console.log("4 - Associar Funcionario");
    console.log("5 - Listar");
    console.log("0 - Voltar");
    opcao = readlineSync.question("Opcao: ");

    if (opcao === "1" && gerenciaTotal) {
      const nome = readlineSync.question("Nome da etapa: ");
      const prazo = readlineSync.question("Prazo (dd/mm/aaaa): ");
      const e = new Etapa(nome, prazo, StatusEtapa.PENDENTE);
      aeronave.etapas.push(e);
      aeronave.salvar();
      console.log("OK.");
    }

    if (opcao === "2" || opcao === "3") {
      if (!aeronave.etapas.length) {
        console.log("Nenhuma etapa cadastrada.");
        continue;
      }
      const ei = readlineSync.keyInSelect(
        aeronave.etapas.map((e: any) => e.nome),
        "Etapa:",
        { cancel: false },
      );

      if (opcao === "3" && ei > 0) {
        const anterior = aeronave.etapas[ei - 1];
        if (anterior.status !== StatusEtapa.CONCLUIDA) {
          console.log("Etapa anterior ainda nao concluida.");
          continue;
        }
      }

      const etapa = new Etapa(
        aeronave.etapas[ei].nome,
        aeronave.etapas[ei].prazo,
        aeronave.etapas[ei].status,
      );
      etapa.funcionarios = aeronave.etapas[ei].funcionarios || [];
      opcao === "2" ? etapa.iniciar() : etapa.finalizar();
      aeronave.etapas[ei] = etapa;
      aeronave.salvar();
      console.log("OK.");
    }

    if (opcao === "4") {
      associarFuncionarioEtapa(aeronave);
    }

    if (opcao === "5") {
      aeronave.etapas.length
        ? aeronave.etapas.forEach((e: any) =>
            console.log(`${e.nome} - ${e.status} - Prazo: ${e.prazo}`),
          )
        : console.log("Nenhuma etapa cadastrada.");
    }
  } while (opcao !== "0");
}

function associarFuncionarioEtapa(aeronave?: Aeronave) {
  if (!aeronave) {
    if (!aeronaves.length)
      return console.log("Cadastre uma aeronave primeiro.");
    const idx = readlineSync.keyInSelect(
      aeronaves.map((a) => a.codigo),
      "Selecione a aeronave:",
      { cancel: false },
    );
    aeronave = aeronaves[idx];
  }
  if (!aeronave.etapas.length) {
    console.log("Nenhuma etapa cadastrada.");
    return;
  }
  if (!funcionarios.length) {
    console.log("Nenhum funcionario cadastrado.");
    return;
  }

  const ei = readlineSync.keyInSelect(
    aeronave.etapas.map((e: any) => e.nome),
    "Etapa:",
    { cancel: false },
  );
  const fi = readlineSync.keyInSelect(
    funcionarios.map((f) => f.nome),
    "Funcionario:",
    { cancel: false },
  );
  const etapa = new Etapa(
    aeronave.etapas[ei].nome,
    aeronave.etapas[ei].prazo,
    aeronave.etapas[ei].status,
  );
  etapa.funcionarios = aeronave.etapas[ei].funcionarios || [];
  etapa.associarFuncionario(funcionarios[fi]);
  aeronave.etapas[ei] = etapa;
  aeronave.salvar();
  console.log("OK.");
}

function menuTestes() {
  if (!aeronaves.length) return console.log("Cadastre uma aeronave primeiro.");
  const idx = readlineSync.keyInSelect(
    aeronaves.map((a) => a.codigo),
    "Selecione a aeronave:",
    { cancel: false },
  );
  const aeronave = aeronaves[idx];

  let opcao: string;
  do {
    console.log("\nTestes:");
    console.log("1 - Adicionar");
    console.log("2 - Listar");
    console.log("0 - Voltar");
    opcao = readlineSync.question("Opcao: ");

    if (opcao === "1") {
      const tipoIdx = readlineSync.keyInSelect(
        Object.values(TipoTeste),
        "Tipo:",
        { cancel: false },
      );
      const resultadoIdx = readlineSync.keyInSelect(
        Object.values(ResultadoTeste),
        "Resultado:",
        { cancel: false },
      );
      const t = new Teste(
        Object.values(TipoTeste)[tipoIdx],
        Object.values(ResultadoTeste)[resultadoIdx],
      );
      aeronave.testes.push(t);
      aeronave.salvar();
      console.log("OK.");
    }

    if (opcao === "2") {
      aeronave.testes.length
        ? aeronave.testes.forEach((t: any) =>
            console.log(`${t.tipo} - ${t.resultado}`),
          )
        : console.log("Nenhum teste registrado.");
    }
  } while (opcao !== "0");
}

function gerarRelatorio() {
  if (!aeronaves.length) return console.log("Nenhuma aeronave cadastrada.");
  const idx = readlineSync.keyInSelect(
    aeronaves.map((a) => a.codigo),
    "Selecione a aeronave:",
    { cancel: false },
  );
  const rel = new Relatorio();
  rel.gerarRelatorio(aeronaves[idx]);
  console.log(rel.conteudo);
  if (readlineSync.keyInYN("Salvar em txt")) {
    rel.salvarEmArquivo();
  }
}

carregarDados();

if (funcionarios.length === 0) {
  const admin = new Funcionario(
    "1",
    "Gerson",
    "1240028922",
    "Avenida Cesare Monsueto Giulio Lattes, 1350",
    "gersao",
    "12345678",
    NivelPermissao.ADMINISTRADOR,
  );
  admin.salvar();
  funcionarios.push(admin);
  console.log("Primeirp acesso");
  console.log("Usuario: gersao");
  console.log("Senha: 12345678");
}

while (!usuarioAtual) {
  if (!login() && !readlineSync.keyInYN("Tentar novamente?")) process.exit(0);
}

const user = usuarioAtual as Funcionario;
switch (user.nivelPermissao) {
  case NivelPermissao.ADMINISTRADOR:
    menuAdmin();
    break;
  case NivelPermissao.ENGENHEIRO:
    menuEngenheiro();
    break;
  case NivelPermissao.OPERADOR:
    menuOperador();
    break;
}
