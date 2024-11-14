import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-insert',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div>
      <h2>Insert New Student Details</h2>
      <form [formGroup]="applyForm" (ngSubmit)="submitNewStudent()">
        <div>
          <label for="firstName">First Name:</label>
          <input id="firstName" formControlName="firstName" />
        </div>
        <div>
          <label for="lastName">Last Name:</label>
          <input id="lastName" formControlName="lastName" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" formControlName="email" />
        </div>
        <div>
          <label for="phoneNumber">Phone Number:</label>
          <input id="phoneNumber" formControlName="phoneNumber" />
        </div>
        <button type="submit" [disabled]="applyForm.invalid">
          Save Changes
        </button>
      </form>
    </div>
  `,
  styleUrl: './student-insert.component.css',
})
export class StudentInsertComponent {
  private router: Router = inject(Router);
  studentService = inject(StudentService);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  submitNewStudent() {
    this.studentService.insertStudent(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
      this.applyForm.value.phoneNumber ?? ''
    );
    this.applyForm.reset();
    this.applyForm.markAsUntouched();
    this.router.navigate(['/'], { queryParams: { refresh: true } });
  }
}
