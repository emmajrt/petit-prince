import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { addIcons } from 'ionicons';
import { warningOutline, bookmark, bookmarkOutline } from 'ionicons/icons';
import { RefresherEventDetail } from '@ionic/core';

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
  showOnlyFavorites = false;

  constructor(private http: HttpClient) {
    addIcons({ warningOutline, bookmark, bookmarkOutline });
  }

  async ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
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
          this.loadFavorites();
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

  toggleFavorite(article: any) {
    article.favorite = !article.favorite;
    if (article.favorite) {
      localStorage.setItem('favorite-' + article.id, 'true');
    } else {
      localStorage.removeItem('favorite-' + article.id);
    }
  }
  
  getFavoriteIcon(article: any): string {
    return article.favorite ? 'bookmark' : 'bookmark-outline';
  }

  loadFavorites() {
    this.articles.forEach(article => {
      const favorite = localStorage.getItem('favorite-' + article.id);
      article.favorite = favorite === 'true';
    });
  }

  toggleShowFavorites() {
    this.showOnlyFavorites = !this.showOnlyFavorites;
    this.filterArticles();
  }

  filterArticles() {
    if (this.showOnlyFavorites) {
      this.filteredArticles = this.articles.filter(article => article.favorite);
    } else {
      this.filteredArticles = this.articles;
    }
  }

  doRefresh(event: CustomEvent<RefresherEventDetail>) {
    this.loadArticles().then(() => {
      this.loadFavorites();
      this.filterArticles();
      (event.target as HTMLIonRefresherElement).complete();
    });
  }

  
}


