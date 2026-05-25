import { Injectable } from '@angular/core';

export type TipoSenha = 'SP' | 'SG' | 'SE';
export type StatusSenha = 'aguardando' | 'atendida' | 'descartada';

export interface SenhaAtendimento {
  codigo: string;
  tipo: TipoSenha;
  emitidaEm: Date;
  atendidaEm?: Date;
  guiche?: number;
  tempoAtendimento?: number;
  status: StatusSenha;
}

type GrupoChamada = 'SP' | 'NAO_SP';

@Injectable({ providedIn: 'root' })
export class SenhasService {
  public senhasArray: Record<TipoSenha, SenhaAtendimento[]> = { SG: [], SP: [], SE: [] };
  public ultimasChamadas: SenhaAtendimento[] = [];
  public senhaAtual: SenhaAtendimento | null = null;
  public inputNovaSenha = '';
  public expedienteAberto = localStorage.getItem('expedienteAberto') !== 'false';
  public mensagem = 'Expediente aberto para simulacao: 07:00 as 17:00.';

  public readonly tipos: TipoSenha[] = ['SP', 'SE', 'SG'];
  public readonly rotulos: Record<TipoSenha, string> = {
    SP: 'Prioritaria',
    SG: 'Geral',
    SE: 'Retirada de exames',
  };

  private historico: SenhaAtendimento[] = [];
  private sequenciasPorDia: Record<string, Record<TipoSenha, number>> = {};
  private ultimoGrupoChamado: GrupoChamada | null = null;

  constructor() {}

  get totalEmitidas(): number {
    return this.historico.length;
  }

  get totalAtendidas(): number {
    return this.historico.filter((senha) => senha.status === 'atendida').length;
  }

  get totalDescartadas(): number {
    return this.historico.filter((senha) => senha.status === 'descartada').length;
  }

  get relatorioDetalhado(): SenhaAtendimento[] {
    return [...this.historico].sort((a, b) => b.emitidaEm.getTime() - a.emitidaEm.getTime());
  }

  novaSenha(tipo: TipoSenha): void {
    if (!this.expedienteAberto) {
      this.mensagem = 'Expediente encerrado. Inicie um novo expediente para emitir senhas.';
      return;
    }

    const emitidaEm = new Date();
    const codigo = this.gerarCodigo(tipo, emitidaEm);
    const senha: SenhaAtendimento = {
      codigo,
      tipo,
      emitidaEm,
      status: 'aguardando',
    };

    this.senhasArray[tipo].push(senha);
    this.historico.push(senha);
    this.inputNovaSenha = codigo;
    this.mensagem = `Senha ${codigo} emitida.`;
  }

  proximaSenha(guiche = 1): void {
    if (!this.expedienteAberto) {
      this.senhaAtual = null;
      this.mensagem = 'Expediente encerrado. Inicie um novo expediente para chamar senhas.';
      return;
    }

    let senha = this.selecionarProximaSenha();

    while (senha && this.deveDescartarPorAusencia()) {
      senha.status = 'descartada';
      this.mensagem = `Senha ${senha.codigo} descartada por ausencia do cliente.`;
      senha = this.selecionarProximaSenha();
    }

    if (!senha) {
      this.senhaAtual = null;
      this.mensagem = 'Fila vazia.';
      return;
    }

    senha.status = 'atendida';
    senha.atendidaEm = new Date();
    senha.guiche = guiche;
    senha.tempoAtendimento = this.calcularTempoMedio(senha.tipo);
    this.ultimoGrupoChamado = senha.tipo === 'SP' ? 'SP' : 'NAO_SP';
    this.senhaAtual = senha;
    this.ultimasChamadas.unshift(senha);
    this.ultimasChamadas = this.ultimasChamadas.slice(0, 5);
    this.mensagem = `Senha ${senha.codigo} chamada no guiche ${guiche}.`;
  }

  iniciarExpediente(): void {
    this.expedienteAberto = true;
    localStorage.setItem('expedienteAberto', 'true');
    this.mensagem = 'Expediente aberto para simulacao: 07:00 as 17:00.';
  }

  encerrarExpediente(): void {
    this.descartarFilaDoDia();
    this.expedienteAberto = false;
    localStorage.setItem('expedienteAberto', 'false');
    this.senhaAtual = null;
    this.mensagem = 'Expediente encerrado. Senhas restantes foram descartadas.';
  }

  totalEmitidasPorTipo(tipo: TipoSenha): number {
    return this.historico.filter((senha) => senha.tipo === tipo).length;
  }

  totalAtendidasPorTipo(tipo: TipoSenha): number {
    return this.historico.filter((senha) => senha.tipo === tipo && senha.status === 'atendida').length;
  }

  tempoMedioPorTipo(tipo: TipoSenha): string {
    const atendidas = this.historico.filter(
      (senha) => senha.tipo === tipo && senha.status === 'atendida' && senha.tempoAtendimento,
    );

    if (!atendidas.length) {
      return '0 min';
    }

    const total = atendidas.reduce((soma, senha) => soma + (senha.tempoAtendimento ?? 0), 0);
    return `${(total / atendidas.length).toFixed(1)} min`;
  }

  formatarData(data?: Date): string {
    if (!data) {
      return '-';
    }

    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  private gerarCodigo(tipo: TipoSenha, data: Date): string {
    const yy = String(data.getFullYear()).slice(-2);
    const mm = String(data.getMonth() + 1).padStart(2, '0');
    const dd = String(data.getDate()).padStart(2, '0');
    const chaveDia = `${yy}${mm}${dd}`;

    if (!this.sequenciasPorDia[chaveDia]) {
      this.sequenciasPorDia[chaveDia] = { SP: 0, SG: 0, SE: 0 };
    }

    this.sequenciasPorDia[chaveDia][tipo]++;
    const sequencia = String(this.sequenciasPorDia[chaveDia][tipo]).padStart(2, '0');

    return `${chaveDia}-${tipo}${sequencia}`;
  }

  private selecionarProximaSenha(): SenhaAtendimento | undefined {
    if (this.ultimoGrupoChamado !== 'SP' && this.senhasArray.SP.length) {
      return this.senhasArray.SP.shift();
    }

    if (this.senhasArray.SE.length) {
      return this.senhasArray.SE.shift();
    }

    if (this.senhasArray.SG.length) {
      return this.senhasArray.SG.shift();
    }

    return this.senhasArray.SP.shift();
  }

  private calcularTempoMedio(tipo: TipoSenha): number {
    if (tipo === 'SP') {
      return this.numeroAleatorioInteiro(10, 20);
    }

    if (tipo === 'SG') {
      return this.numeroAleatorioInteiro(2, 8);
    }

    return Math.random() < 0.95 ? 1 : 5;
  }

  private deveDescartarPorAusencia(): boolean {
    return Math.random() < 0.05;
  }

  private descartarFilaDoDia(): void {
    this.tipos.forEach((tipo) => {
      this.senhasArray[tipo].forEach((senha) => {
        senha.status = 'descartada';
      });
      this.senhasArray[tipo] = [];
    });
  }

  private numeroAleatorioInteiro(minimo: number, maximo: number): number {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }
}
