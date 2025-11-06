import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { LoginRequest, RegisterRequest, AuthResponse, UserProfile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserProfile | null>(null);
  public currentUser$: Observable<UserProfile | null> = this.currentUserSubject.asObservable();
  private readonly SESSION_KEY = 'user_session';

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {
    this.loadSession();
  }

  private async loadSession(): Promise<void> {
    try {
      const { value } = await Preferences.get({ key: this.SESSION_KEY });
      if (value) {
        const user: UserProfile = JSON.parse(value);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Error loading session:', error);
    }
  }

  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const user = await this.databaseService.validateCredentials(
        credentials.email,
        credentials.password
      );

      if (user) {
        await this.setSession(user);
        return {
          success: true,
          message: 'Login successful',
          user
        };
      }

      return {
        success: false,
        message: 'Invalid email or password'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: 'An error occurred during login'
      };
    }
  }

  async register(registerData: RegisterRequest): Promise<AuthResponse> {
    try {
      // Verificar si el email ya existe
      const emailExists = await this.databaseService.emailExists(registerData.email);
      if (emailExists) {
        return {
          success: false,
          message: 'Email already registered'
        };
      }

      // Crear nuevo usuario con rol 'user'
      const userId = await this.databaseService.createUser({
        email: registerData.email,
        password: registerData.password,
        name: registerData.name,
        role: 'user',
        createdAt: new Date().toISOString()
      });

      if (userId > 0) {
        const user = await this.databaseService.getUserById(userId);
        if (user) {
          await this.setSession(user);
          return {
            success: true,
            message: 'Registration successful',
            user
          };
        }
      }

      return {
        success: false,
        message: 'Failed to create user'
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An error occurred during registration'
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await Preferences.remove({ key: this.SESSION_KEY });
      this.currentUserSubject.next(null);
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  private async setSession(user: UserProfile): Promise<void> {
    await Preferences.set({
      key: this.SESSION_KEY,
      value: JSON.stringify(user)
    });
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): UserProfile | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === 'admin';
  }

  hasRole(role: 'admin' | 'user'): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }

  async updateCurrentUser(): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (currentUser?.id) {
      const updatedUser = await this.databaseService.getUserById(currentUser.id);
      if (updatedUser) {
        await this.setSession(updatedUser);
      }
    }
  }
}
