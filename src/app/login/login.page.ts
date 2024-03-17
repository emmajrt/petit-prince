import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { catchError, tap } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';

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

  constructor(
    private http: HttpClient, 
    private navCtrl: NavController,
    private toastController: ToastController
  ) {
    const savedLogin = localStorage.getItem('login');
    const savedPassword = localStorage.getItem('password');
    if (savedLogin && savedPassword) {
      this.login = savedLogin;
      this.password = savedPassword;
      this.rememberMe = true;
    }
  }

  async submitLogin() {
    const url = 'https://sebastien-thon.fr/prince/index.php?connexion';
    const params = {
      login: this.login,
      mdp: this.password
    };

    try {
      const response = await firstValueFrom(
        this.http.get<any>(url, { params }).pipe(
          tap((response) => {
            if (response.resultat === 'OK') {
              if (this.rememberMe) {
                localStorage.setItem('login', this.login);
                localStorage.setItem('password', this.password);
              } else {
                localStorage.removeItem('login');
                localStorage.removeItem('password');
                sessionStorage.setItem('login', this.login);
                sessionStorage.setItem('password', this.password);
              }
              this.navCtrl.navigateRoot('/tutorial');
            } else {
              this.showErrorToast('Login ou mot de passe incorrect');
            }
          }),
          catchError((error) => {
            console.error('Une erreur est survenue lors de la connexion : ', error);
            this.showErrorToast('Une erreur est survenue lors de la connexion');
            throw error;
          })
        )
      );

    } catch (error) {
      console.error('Une erreur est survenue lors de la connexion : ', error);
    }
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2500,
      color: 'danger',
      position: 'bottom',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          handler: () => {
            console.log('Toast fermé');
          }
        }
      ]
    });
    toast.present();
  }
}
