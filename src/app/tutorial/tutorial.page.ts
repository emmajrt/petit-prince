import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, bookOutline, bookmark, bookmarkOutline, imagesOutline, calendarOutline, informationCircleOutline } from 'ionicons/icons';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class TutorialPage implements OnInit {
  constructor(private navCtrl: NavController) {
    addIcons({ arrowForwardOutline, bookOutline, bookmark, bookmarkOutline, imagesOutline, calendarOutline, informationCircleOutline });
  }

  ngOnInit() {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (hasSeenTutorial) {

      this.navCtrl.navigateRoot('/tabs/articles');
    }
  }

  finishTutorial() {
    localStorage.setItem('hasSeenTutorial', 'true');

    this.navCtrl.navigateRoot('/tabs/articles');
  }
}
