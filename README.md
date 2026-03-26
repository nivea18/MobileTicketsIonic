# 🏥 Sistema de Controle de Atendimento - Fila Médica

Este projeto foi desenvolvido como parte da disciplina de Programação Mobile. O objetivo é gerenciar o fluxo de atendimento em laboratórios médicos, organizando a emissão e a chamada de senhas por prioridade.

## 📱 Sobre o Projeto
O sistema simula um ecossistema de atendimento com três agentes principais:
1. **Agente Cliente (AC):** Emite senhas de acordo com sua necessidade (Geral, Prioritária ou Exame).
2. **Agente Atendente (AA):** Gerencia a chamada das senhas obedecendo às regras de prioridade.
3. **Agente Sistema (AS):** Processa os dados e gera relatórios de desempenho e volumetria.

## 🚀 Tecnologias Utilizadas
* **Framework:** [Ionic](https://ionicframework.com/) (v7+)
* **Lógica:** [Angular](https://angular.io/) (Standalone Components)
* **Linguagem:** TypeScript
* **Design:** Ionicons e CSS3 customizado

## 📸 Demonstração do App (Telas)

| Cliente (Totem) | Atendente (Painel) | Relatórios |
| :---: | :---: | :---: |
| ![Tela Cliente](images\cliente.png) | ![Tela Atendente](images\atendente.png) | ![Tela Relatório](images\relatórios.png) |


## ⚙️ Regras de Negócio Implementadas
* **Formato da Senha:** Segue o padrão `YYMMDD-PPSQ` (ex: 260326-SP01).
* **Priorização:** O sistema alterna as chamadas seguindo o fluxo `[SP] -> [SE|SG] -> [SP] -> [SE|SG]`.
* **Painel de Histórico:** Exibição das últimas 5 senhas chamadas em tempo real.
* **Relatórios:** Contagem automatizada de senhas emitidas e atendidas separadas por categoria.

## 🛠️ Como rodar o projeto
1. Instale as dependências:
   ```bash
   npm install