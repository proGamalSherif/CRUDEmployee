import { Routes } from '@angular/router';
import { ManageEmployeeComponent } from './components/Employee/manage-employee/manage-employee.component';
import { EmployeeDetailsComponent } from './components/Employee/employee-details/employee-details.component';

export const routes: Routes = [
    {path:'',redirectTo:'Manage-Employee',pathMatch:'full'},
    {path:'Manage-Employee',component:ManageEmployeeComponent},
    {path:'Manage-Employee/Employee-Details/:id',component:EmployeeDetailsComponent},
    {path:'**',redirectTo:'Manage-Employee',pathMatch:'full'}
];
