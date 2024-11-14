import { Injectable } from '@angular/core';
import { Student } from '../modules/student/student';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  url = 'http://localhost:3000/students';
  constructor() {}

  async getAllStudents(): Promise<Student[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getStudentById(id: number): Promise<Student> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? [];
  }

  async editStudent(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
  ) {
    const data = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNumber,
      }),
    });
  }

  async deleteStudent(id: number) {
    const data = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  }

  async insertStudent(
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
  ) {
    fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: await this.generateNewStudentId(),
        firstName,
        lastName,
        email,
        phoneNumber,
      }),
    });
  }

  async generateNewStudentId(): Promise<number> {
    const students = await this.getAllStudents();
    let newId = Math.max(...students.map((student) => student.id)) + 1;
    while (students.some((student) => student.id === newId)) {
      newId++;
    }
    return newId;
  }
}
