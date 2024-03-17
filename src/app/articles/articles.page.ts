import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { warningOutline } from 'ionicons/icons';

@Component({
  selector: 'app-articles',
  templateUrl: 'articles.page.html',
  styleUrls: ['articles.page.scss'],
  standalone: true,
  imports: [ExploreContainerComponent, IonicModule, CommonModule, FormsModule],
})
export class ArticlesPage implements OnInit {
  articles: any[] = [];
  filteredArticles: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {
    addIcons({ warningOutline });
  }

  async ngOnInit() {
    const savedLogin = localStorage.getItem('login') || sessionStorage.getItem('login');
    const savedPassword = localStorage.getItem('password') || sessionStorage.getItem('password');
  
    if (savedLogin && savedPassword) {
      const url = `https://sebastien-thon.fr/prince/index.php?login=${savedLogin}&mdp=${savedPassword}`;
  
      try {
        const response = await firstValueFrom(this.http.get<any>(url));
  
        if (response.erreur) {
          console.error(response.erreur);
        } else {
          this.articles = response.articles;
          this.filteredArticles = [...this.articles];
        }
      } catch (error) {
        console.error('Une erreur est survenue lors de la récupération des articles : ', error);
      }
    } else {
      console.error('Login ou mot de passe non trouvé dans le stockage local');
    }
  }
  
  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.titre.toLowerCase().includes(query) ||
      article.texte.toLowerCase().includes(query)
    );
  }
}


