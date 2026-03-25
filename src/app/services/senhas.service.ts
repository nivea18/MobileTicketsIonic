import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SenhasService {

  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  
  // variável pra guardar o texto que vai aparecer na tela
  public ultimaSenha: string = '';

  constructor() { }

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
    this.ultimaSenha = "Geral - " + this.senhasGeral;
  }

  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
    this.ultimaSenha = "Prioritária - " + this.senhasPrior;
  }

  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
    this.ultimaSenha = "Exame - " + this.senhasExame;
  }
}