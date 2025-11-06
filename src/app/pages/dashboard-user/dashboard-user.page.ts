import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonChip,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  AlertController,
  ToastController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  logOutOutline,
  mailOutline,
  calendarOutline,
  shieldCheckmarkOutline,
  homeOutline,
  settingsOutline,
  helpCircleOutline
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.page.html',
  styleUrls: ['./dashboard-user.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonIcon,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonChip,
    IonGrid,
    IonRow,
    IonCol,
    IonButtons
  ]
})
export class DashboardUserPage implements OnInit {
  user: UserProfile | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      logOutOutline,
      mailOutline,
      calendarOutline,
      shieldCheckmarkOutline,
      homeOutline,
      settingsOutline,
      helpCircleOutline
    });
  }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (!this.user) {
      this.router.navigate(['/login']);
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirm Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Logout',
          role: 'confirm',
          handler: async () => {
            await this.authService.logout();
            await this.showToast('Logged out successfully', 'success');
          }
        }
      ]
    });

    await alert.present();
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  private async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });
    await toast.present();
  }
}
