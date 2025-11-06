import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { User, UserProfile } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbReady = new BehaviorSubject<boolean>(false);
  private readonly STORAGE_KEY = 'ionicpiloto_users';
  private isWeb: boolean;
  private users: User[] = [];

  constructor() {
    this.isWeb = Capacitor.getPlatform() === 'web';
  }

  async initializeDatabase(): Promise<void> {
    try {
      // En web, usar localStorage
      if (this.isWeb) {
        await this.initWebStorage();
      } else {
        // En móvil, usar SQLite (implementar más tarde)
        await this.initWebStorage(); // Por ahora usar localStorage también
      }

      // Crear usuario admin por defecto
      await this.createDefaultAdmin();

      this.dbReady.next(true);
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }

  private async initWebStorage(): Promise<void> {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.users = JSON.parse(stored);
    } else {
      this.users = [];
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
  }

  private async createTables(): Promise<void> {
    // No necesario en localStorage
  }

  private async createDefaultAdmin(): Promise<void> {
    try {
      const adminExists = await this.getUserByEmail('admin@test.com');
      if (!adminExists) {
        const admin: User = {
          email: 'admin@test.com',
          password: 'admin123',
          name: 'Administrator',
          role: 'admin',
          createdAt: new Date().toISOString()
        };
        await this.createUser(admin);
        console.log('Default admin user created');
      }
    } catch (error) {
      console.error('Error creating default admin:', error);
    }
  }

  async createUser(user: User): Promise<number> {
    const newUser: User = {
      ...user,
      id: this.getNextId(),
      createdAt: user.createdAt || new Date().toISOString()
    };
    this.users.push(newUser);
    this.saveToStorage();
    return newUser.id!;
  }

  private getNextId(): number {
    if (this.users.length === 0) return 1;
    const maxId = Math.max(...this.users.map(u => u.id || 0));
    return maxId + 1;
  }

  async getUserByEmail(email: string): Promise<UserProfile | null> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      return this.toUserProfile(user);
    }
    return null;
  }

  async getUserById(id: number): Promise<UserProfile | null> {
    const user = this.users.find(u => u.id === id);
    if (user) {
      return this.toUserProfile(user);
    }
    return null;
  }

  async validateCredentials(email: string, password: string): Promise<UserProfile | null> {
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      return this.toUserProfile(user);
    }
    return null;
  }

  async getAllUsers(): Promise<UserProfile[]> {
    return this.users
      .map(u => this.toUserProfile(u))
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async updateUser(id: number, updates: Partial<User>): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = {
        ...this.users[index],
        ...updates
      };
      this.saveToStorage();
      return true;
    }
    return false;
  }

  async deleteUser(id: number): Promise<boolean> {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.some(u => u.email === email);
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  async closeDatabase(): Promise<void> {
    this.saveToStorage();
    this.dbReady.next(false);
  }

  private toUserProfile(user: User): UserProfile {
    return {
      id: user.id!,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt!
    };
  }
}
