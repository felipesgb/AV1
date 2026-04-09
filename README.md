# Aerocode

Sistema CLI de gestão da produção de aeronaves, desenvolvido em TypeScript.

Projeto desenvolvido para a AV1 da [FATEC SJC — Jessen Vidal](https://fatecsjc-prd.azurewebsites.net/), sob orientação do professor Gerson Penha.

---

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/felipesgb/AV1
cd AV1
npm install
```

---

## Como rodar

```bash
npx ts-node src/index.ts
```

No primeiro acesso, o sistema cria automaticamente um usuário administrador:

```
Usuario: gersao
Senha:   12345678
```


Estrutura do projeto:
```
AV1/
├── data/
│   └── relatorios/
├── src/
│   ├── enums/
│   │   ├── NivelPermissao.ts
│   │   ├── ResultadoTeste.ts
│   │   ├── StatusEtapa.ts
│   │   ├── StatusPeca.ts
│   │   ├── TipoAeronave.ts
│   │   ├── TipoPeca.ts
│   │   └── TipoTeste.ts
│   ├── models/
│   │   ├── Aeronave.ts
│   │   ├── Etapa.ts
│   │   ├── Funcionario.ts
│   │   ├── Peca.ts
│   │   ├── Relatorio.ts
│   │   └── Teste.ts
│   └── index.ts
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```
