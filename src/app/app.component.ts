import { Component, OnInit } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { DatabaseService } from './core/services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private databaseService: DatabaseService) {}

  async ngOnInit() {
    try {
      await this.databaseService.initializeDatabase();
      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Error initializing application:', error);
    }
  }
}
