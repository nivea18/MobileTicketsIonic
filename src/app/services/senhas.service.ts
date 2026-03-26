import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SenhasService {
  public senhasArray: any = { SG: [], SP: [], SE: [] };
  public ultimasChamadas: string[] = []; // Para o painel das 5 últimas
  public senhaAtual: string = '';
  public inputNovaSenha: string = '';

  // contadores pra o Relatório
  public totalEmitidas = 0;
  public totalAtendidas = 0;

  constructor() {}

  novaSenha(tipo: string) {
    const data = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const num = (this.senhasArray[tipo].length + 1).toString().padStart(2, '0');
    const senha = `${data}-${tipo}${num}`;
    
    this.senhasArray[tipo].push(senha);
    this.inputNovaSenha = senha;
    this.totalEmitidas++;
  }

  proximaSenha() {
    let senhaChamar = '';

    // SP primeiro depois SE depois SG
    if (this.senhasArray.SP.length > 0) {
      senhaChamar = this.senhasArray.SP.shift();
    } else if (this.senhasArray.SE.length > 0) {
      senhaChamar = this.senhasArray.SE.shift();
    } else if (this.senhasArray.SG.length > 0) {
      senhaChamar = this.senhasArray.SG.shift();
    }

    if (senhaChamar) {
      this.senhaAtual = senhaChamar;
      this.totalAtendidas++;
      this.ultimasChamadas.unshift(senhaChamar);
      if (this.ultimasChamadas.length > 5) this.ultimasChamadas.pop();
    } else {
      this.senhaAtual = 'Fila Vazia';
    }
  }
}