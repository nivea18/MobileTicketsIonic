import { Component } from '@angular/core';
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardContent, IonButton,
  IonItem, IonLabel, IonText 
} from '@ionic/angular/standalone';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardContent, IonButton,
    IonItem, IonLabel, IonText 
  ] 
})
export class Tab1Page {
  constructor(public senhasService: SenhasService) {}
}