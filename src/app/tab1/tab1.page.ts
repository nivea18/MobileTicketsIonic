import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; // precisou importar para o código reconhecer o ionic
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true, // página é independente
  imports: [IonicModule] 
})
export class Tab1Page {

  inputNovaSenha: string = '';

  constructor(public senhasService: SenhasService) {}

}