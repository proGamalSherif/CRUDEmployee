import { Routes } from '@angular/router';
import { ManageEmployeeComponent } from './components/Employee/manage-employee/manage-employee.component';

export const routes: Routes = [
    {path:'',redirectTo:'Employee-Details',pathMatch:'full'},
    {path:'Employee-Details',component:ManageEmployeeComponent},
    {path:'**',redirectTo:'Employee-Details',pathMatch:'full'}
];
