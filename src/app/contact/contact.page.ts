import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ContactPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  showTutorial() {
    localStorage.removeItem('hasSeenTutorial');
    this.navCtrl.navigateRoot('/tutorial');
  }
}
