# MobileTicketsIonic

Sistema Ionic/Angular para controle de atendimento em filas de laboratorios medicos. O projeto evolui a Fase 1 e implementa as regras descritas no documento "Sistema para controle de atendimento".

## Tecnologias

- Ionic
- Angular com NgModules
- TypeScript
- Capacitor

## Agentes do sistema

- AC - Agente Cliente: emite senhas no totem.
- AA - Agente Atendente: chama a proxima senha disponivel para atendimento.
- AS - Agente Sistema: controla filas, prioridades, descarte, historico e relatorios.

## Regras implementadas

- Tres tipos de senha: `SP` para Prioritaria, `SG` para Geral e `SE` para Retirada de Exames.
- Numeracao no formato `YYMMDD-PPSQ`, com sequencia reiniciada por dia e por tipo.
- Chamada alternada conforme a regra `[SP] -> [SE|SG] -> [SP] -> [SE|SG]`.
- Senhas `SE` sao chamadas antes das `SG` apos uma senha prioritaria, por terem atendimento rapido.
- Expediente tratado das 07:00 as 17:00; ao encerrar, senhas restantes sao descartadas.
- 5% das senhas chamadas podem ser descartadas por ausencia do cliente.
- Painel de atendimento exibe apenas a senha atual e as 5 ultimas senhas chamadas.
- Relatorios com totais emitidos, atendidos, descartados, quantitativos por prioridade e relatorio detalhado.
- Tempo medio simulado por tipo: `SP` entre 10 e 20 min, `SG` entre 2 e 8 min e `SE` com 1 min em 95% dos atendimentos ou 5 min em 5%.

## Telas

| Cliente | Atendente | Relatorios |
| :---: | :---: | :---: |
| ![Tela Cliente](cliente.png) | ![Tela Atendente](atendente.png) | ![Tela Relatorios](relatorios.png) |

## Como rodar

```bash
npm install
npm start
```

Depois acesse o endereco exibido pelo Angular no navegador.

## Estrutura principal

- `src/app/services/senhas.service.ts`: regras de negocio, filas, codigos, chamadas, descartes e relatorios.
- `src/app/tab1`: totem do cliente.
- `src/app/tab2`: painel do atendente.
- `src/app/tab3`: relatorios.
- `src/app/app.module.ts`: configuracao Angular com NgModules.
