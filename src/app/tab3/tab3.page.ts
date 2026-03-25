import { Component } from '@angular/core';
// importando os componentes um por 1 pra não dar erro de novo já que não tem mais o módulo ionic
import { 
  IonHeader, IonToolbar, IonTitle, IonContent, 
  IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel 
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { SenhasService } from '../services/senhas.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  // listando os componentes importados acima
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, 
    IonCard, IonCardHeader, IonCardTitle, IonCardContent, 
    IonList, IonItem, IonLabel, ExploreContainerComponent
  ]
})
export class Tab3Page {

  constructor(public senhasService: SenhasService) {}

}