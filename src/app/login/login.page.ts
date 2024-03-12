
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class LoginPage {
  login: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(private http: HttpClient, private navCtrl: NavController) {
    // Vérifier si des informations de connexion sont enregistrées dans le stockage local
    const savedLogin = localStorage.getItem('login');
    const savedPassword = localStorage.getItem('password');
    if (savedLogin && savedPassword) {
      this.login = savedLogin;
      this.password = savedPassword;
      this.rememberMe = true; // cocher automatiquement la case "Se souvenir de moi"
    }
  }

  submitLogin() {
    const url = 'http://www.sebastien-thon.fr/prince/index.php?connexion';
    const params = {
      login: this.login,
      mdp: this.password
    };

    this.http.get<any>(url, { params }).subscribe(
      (response) => {
        if (response.resultat === 'OK') {
          // Connexion réussie, enregistrer les informations de connexion si "Se souvenir de moi" est coché
          if (this.rememberMe) {
            localStorage.setItem('login', this.login);
            localStorage.setItem('password', this.password);
          } else {
            // Supprimer les informations de connexion du stockage local si "Se souvenir de moi" n'est pas coché
            localStorage.removeItem('login');
            localStorage.removeItem('password');
          }
          // Rediriger vers l'écran principal
          this.navCtrl.navigateRoot('/tabs/tab1');
        } else {
          // Afficher un message d'erreur
          console.error('Login ou mot de passe incorrect');
        }
      },
      (error) => {
        console.error('Une erreur est survenue lors de la connexion : ', error);
      }
    );
  }
}

