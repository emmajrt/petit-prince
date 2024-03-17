import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-galeries',
  templateUrl: 'galeries.page.html',
  styleUrls: ['galeries.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule],
})
export class GaleriesPage implements OnInit {
  galeries: any[] = [];
  selectedPhoto: string = '';

  constructor(private http: HttpClient) {
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
          this.galeries = response.galeries;
        }
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des galeries : ', error);
      }
    } else {
      console.error('Login ou mot de passe non trouvé dans le stockage local');
    }
  }

  showPhoto(photo: any) {
    this.selectedPhoto = 'https://sebastien-thon.fr/prince/images/' + photo.image;
  }

  closePhoto() {
    this.selectedPhoto = '';
  }
}

