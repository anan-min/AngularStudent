import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  template: `
    <nav>
      <ul>
        <li><a routerLink="/">Home</a></li>
        <li><a routerLink="/student-insert">Add Student</a></li>
      </ul>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'AngularStudent';
}
