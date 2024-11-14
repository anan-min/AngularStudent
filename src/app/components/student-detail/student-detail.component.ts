import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../../services/student.service';
import { Student } from '../../../modules/student/student';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div *ngIf="student">
      <h2>Edit Student {{ student.id }} Details</h2>
      <form [formGroup]="applyForm" (ngSubmit)="onSubmit()">
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
  styleUrl: './student-detail.component.css',
})
export class StudentDetailComponent {
  StudentService = inject(StudentService);
  student: Student | undefined;
  private router: Router = inject(Router);

  route: ActivatedRoute = inject(ActivatedRoute);
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
  });

  StudentId: number = 0;
  constructor() {
    this.StudentId = parseInt(this.route.snapshot.params['id'], 10);
    this.StudentService.getStudentById(this.StudentId).then((student) => {
      this.student = student;
      this.applyForm.setValue({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phoneNumber: student.phoneNumber,
      });
    });
  }

  onSubmit() {
    if (this.student) {
      this.StudentService.editStudent(
        this.StudentId,
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? '',
        this.applyForm.value.phoneNumber ?? ''
      );
    }
    this.router.navigate(['/']);
  }
}
