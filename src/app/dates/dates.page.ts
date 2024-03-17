import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { calendarNumberOutline } from 'ionicons/icons';

@Component({
  selector: 'app-dates',
  templateUrl: 'dates.page.html',
  styleUrls: ['dates.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule],
})
export class DatesPage implements OnInit {
  dates: any[] = [];

  constructor(private http: HttpClient) { 
    addIcons({ calendarNumberOutline});
  }

  async ngOnInit() {
    const savedLogin = localStorage.getItem('login') || sessionStorage.getItem('login');
    const savedPassword = localStorage.getItem('password') || sessionStorage.getItem('password');

    if (savedLogin && savedPassword) {
      const url = `https://sebastien-thon.fr/prince/index.php?login=${savedLogin}&mdp=${savedPassword}`;

      try {
        const response = await firstValueFrom(
          this.http.get<any>(url)
        );

        if (response.erreur) {
          console.error(response.erreur);
        } else {
          this.dates = response.dates;
        }
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des dates : ', error);
      }
    } else {
      console.error('Login ou mot de passe non trouvé dans le stockage local');
    }
  }
}

