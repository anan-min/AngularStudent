import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { last } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });
  constructor() {
    const StudentId = parseInt(this.route.snapshot.params['id'], 10);
  }
}
