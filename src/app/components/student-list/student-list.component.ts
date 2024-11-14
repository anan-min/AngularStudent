import { Component, inject } from '@angular/core';
import { Student } from '../../../modules/student/student';
import { StudentService } from '../../../services/student.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="student-list">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let student of students">
            <td>{{ student.id }}</td>
            <td>{{ student.firstName }}</td>
            <td>{{ student.lastName }}</td>
            <td>{{ student.email }}</td>
            <td>{{ student.phoneNumber }}</td>
            <td>
              <a [routerLink]="['/student-detail', student.id]">
                <button>Edit</button>
              </a>
            </td>
            <td>
              <button (click)="deleteStudent(student.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  studentService = inject(StudentService);
  students: Student[] = [];

  constructor() {}

  ngOnInit(): void {
    this.loadStudents();
  }

  // Method to load students
  loadStudents() {
    this.studentService.getAllStudents().then((students) => {
      this.students = students;
    });
  }

  deleteStudent(id: number) {
    this.studentService.deleteStudent(id);
    this.students = this.students.filter((student) => student.id !== id);
  }
}
