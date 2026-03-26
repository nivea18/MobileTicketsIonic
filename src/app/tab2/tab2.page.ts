import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
  IonButton, IonList, IonItem, IonLabel, IonListHeader 
} from '@ionic/angular/standalone';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonButton, IonList, IonItem, IonLabel, IonListHeader
  ],
})
export class Tab2Page {
  constructor(public senhasService: SenhasService) {}
}