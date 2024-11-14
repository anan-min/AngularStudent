import { Routes } from '@angular/router';
import { HomeComponent } from '../app/components/home/home.component';
import { StudentListComponent } from '../app/components/student-list/student-list.component';
import { StudentDetailComponent } from '../app/components/student-detail/student-detail.component';
import { StudentInsertComponent } from '../app/components/student-insert/student-insert.component';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'student-detail/:id', component: StudentDetailComponent },
  { path: 'student-insert', component: StudentInsertComponent },
];
