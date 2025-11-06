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
  IonBackButton,
  IonButtons,
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, lockClosedOutline, personOutline, personAddOutline, arrowBackOutline } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { RegisterRequest } from '../../core/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
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
    IonText,
    IonBackButton,
    IonButtons
  ]
})
export class RegisterPage implements OnInit {
  registerData: RegisterRequest & { confirmPassword: string } = {
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    addIcons({ mailOutline, lockClosedOutline, personOutline, personAddOutline, arrowBackOutline });
  }

  ngOnInit() {
    // Si ya está autenticado, redirigir al dashboard correspondiente
    if (this.authService.isAuthenticated()) {
      this.redirectToDashboard();
    }
  }

  async register() {
    // Validaciones
    if (!this.registerData.name || !this.registerData.email || !this.registerData.password || !this.registerData.confirmPassword) {
      await this.showToast('Please fill in all fields', 'warning');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      await this.showToast('Passwords do not match', 'warning');
      return;
    }

    if (this.registerData.password.length < 6) {
      await this.showToast('Password must be at least 6 characters', 'warning');
      return;
    }

    if (!this.isValidEmail(this.registerData.email)) {
      await this.showToast('Please enter a valid email', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creating account...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const { confirmPassword, ...registerRequest } = this.registerData;
      const response = await this.authService.register(registerRequest);

      await loading.dismiss();

      if (response.success && response.user) {
        await this.showToast('Account created successfully!', 'success');
        this.redirectToDashboard();
      } else {
        await this.showToast(response.message, 'danger');
      }
    } catch (error) {
      await loading.dismiss();
      await this.showToast('An error occurred during registration', 'danger');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
