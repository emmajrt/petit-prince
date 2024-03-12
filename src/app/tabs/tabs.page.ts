import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookOutline, imagesOutline, calendarOutline, informationCircleOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, CommonModule],
})
export class TabsPage {
  showTabs: boolean = true;
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private route: ActivatedRoute) {
    this.route.url.subscribe(url => {
      this.showTabs = !url.find(segment => segment.path === 'login');
    });
    addIcons({ bookOutline, imagesOutline, calendarOutline, informationCircleOutline});
  }
}
