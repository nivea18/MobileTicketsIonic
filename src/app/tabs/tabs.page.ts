import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; // <--- IMPORTANTE
import { personOutline, desktopOutline, barChartOutline } from 'ionicons/icons'; // <--- OS ÍCONES

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
})
export class TabsPage {
  constructor() {
    
    addIcons({ 
      'person-outline': personOutline, 
      'desktop-outline': desktopOutline, 
      'bar-chart-outline': barChartOutline 
    });
  }
}