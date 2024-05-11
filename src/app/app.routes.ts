import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';

export const routes: Routes = [
    {path: '', redirectTo: 'employees', pathMatch: 'full'},
    {path: 'employees', component: DashboardComponent},
    {path: 'employee/:id', component: EmployeeInfoComponent}
];
