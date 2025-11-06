import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonText,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, logInOutline, personAddOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { LoginRequest } from '../../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonText
  ]
})
export class LoginPage implements OnInit {
  credentials: LoginRequest = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ mailOutline, lockClosedOutline, logInOutline, personAddOutline });
  }

  ngOnInit() {
    // Si ya está autenticado, redirigir al dashboard correspondiente
    if (this.authService.isAuthenticated()) {
      this.redirectToDashboard();
    }
  }

  async login() {
    if (!this.credentials.email || !this.credentials.password) {
      await this.showToast('Please fill in all fields', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Logging in...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const response = await this.authService.login(this.credentials);

      await loading.dismiss();

      if (response.success && response.user) {
        await this.showToast(`Welcome ${response.user.name}!`, 'success');
        this.redirectToDashboard();
      } else {
        await this.showToast(response.message, 'danger');
      }
    } catch (error) {
      await loading.dismiss();
      await this.showToast('An error occurred during login', 'danger');
    }
  }

  private redirectToDashboard() {
    const user = this.authService.getCurrentUser();
    if (user?.role === 'admin') {
      this.router.navigate(['/dashboard-admin']);
    } else {
      this.router.navigate(['/dashboard-user']);
    }
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
