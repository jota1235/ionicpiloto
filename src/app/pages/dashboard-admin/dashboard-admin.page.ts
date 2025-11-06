import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonChip,
  IonButtons,
  IonFab,
  IonFabButton,
  IonAvatar,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  AlertController,
  ToastController,
  ModalController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  personOutline,
  logOutOutline,
  addOutline,
  createOutline,
  trashOutline,
  peopleOutline,
  shieldCheckmarkOutline,
  mailOutline,
  refreshOutline
} from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';
import { DatabaseService } from '../../core/services/database.service';
import { UserProfile, User } from '../../core/models';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.page.html',
  styleUrls: ['./dashboard-admin.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    IonChip,
    IonButtons,
    IonFab,
    IonFabButton,
    IonAvatar,
    IonSearchbar,
    IonRefresher,
    IonRefresherContent
  ]
})
export class DashboardAdminPage implements OnInit {
  currentUser: UserProfile | null = null;
  users: UserProfile[] = [];
  filteredUsers: UserProfile[] = [];
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {
    addIcons({
      personOutline,
      logOutOutline,
      addOutline,
      createOutline,
      trashOutline,
      peopleOutline,
      shieldCheckmarkOutline,
      mailOutline,
      refreshOutline
    });
  }

  async ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      this.router.navigate(['/login']);
      return;
    }
    await this.loadUsers();
  }

  async loadUsers() {
    try {
      this.users = await this.databaseService.getAllUsers();
      this.filteredUsers = [...this.users];
    } catch (error) {
      console.error('Error loading users:', error);
      await this.showToast('Error loading users', 'danger');
    }
  }

  handleSearch(event: any) {
    const query = event.target.value.toLowerCase();
    this.searchTerm = query;

    if (query.trim() === '') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
      );
    }
  }

  async handleRefresh(event: any) {
    await this.loadUsers();
    event.target.complete();
  }

  async createUser() {
    const alert = await this.alertController.create({
      header: 'Create New User',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          attributes: {
            required: true
          }
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          attributes: {
            required: true
          }
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'Password (min 6 characters)',
          attributes: {
            required: true,
            minlength: 6
          }
        },
        {
          name: 'role',
          type: 'text',
          placeholder: 'Role (user or admin)',
          value: 'user',
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Create',
          handler: async (data) => {
            if (!data.name || !data.email || !data.password || !data.role) {
              await this.showToast('Please fill in all fields', 'warning');
              return false;
            }

            if (data.role !== 'user' && data.role !== 'admin') {
              await this.showToast('Role must be "user" or "admin"', 'warning');
              return false;
            }

            try {
              const emailExists = await this.databaseService.emailExists(data.email);
              if (emailExists) {
                await this.showToast('Email already exists', 'warning');
                return false;
              }

              const newUser: User = {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                createdAt: new Date().toISOString()
              };

              await this.databaseService.createUser(newUser);
              await this.loadUsers();
              await this.showToast('User created successfully', 'success');
              return true;
            } catch (error) {
              await this.showToast('Error creating user', 'danger');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async editUser(user: UserProfile) {
    const alert = await this.alertController.create({
      header: 'Edit User',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Full Name',
          value: user.name
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email',
          value: user.email
        },
        {
          name: 'role',
          type: 'text',
          placeholder: 'Role (user or admin)',
          value: user.role
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Update',
          handler: async (data) => {
            if (!data.name || !data.email || !data.role) {
              await this.showToast('Please fill in all fields', 'warning');
              return false;
            }

            if (data.role !== 'user' && data.role !== 'admin') {
              await this.showToast('Role must be "user" or "admin"', 'warning');
              return false;
            }

            try {
              await this.databaseService.updateUser(user.id, {
                name: data.name,
                email: data.email,
                role: data.role
              });

              await this.loadUsers();
              await this.showToast('User updated successfully', 'success');

              // Si el admin editó su propio perfil, actualizar la sesión
              if (user.id === this.currentUser?.id) {
                await this.authService.updateCurrentUser();
                this.currentUser = this.authService.getCurrentUser();
              }
              return true;
            } catch (error) {
              await this.showToast('Error updating user', 'danger');
              return false;
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteUser(user: UserProfile) {
    if (user.id === this.currentUser?.id) {
      await this.showToast('You cannot delete your own account', 'warning');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: `Are you sure you want to delete user "${user.name}"? This action cannot be undone.`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            try {
              await this.databaseService.deleteUser(user.id);
              await this.loadUsers();
              await this.showToast('User deleted successfully', 'success');
            } catch (error) {
              await this.showToast('Error deleting user', 'danger');
            }
          }
        }
      ]
    });

    await alert.present();
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

  getRoleColor(role: string): string {
    return role === 'admin' ? 'danger' : 'primary';
  }

  getAdminCount(): number {
    return this.users.filter(u => u.role === 'admin').length;
  }

  getUserCount(): number {
    return this.users.filter(u => u.role === 'user').length;
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
