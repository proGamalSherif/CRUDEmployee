import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';

@Component({
  selector: 'app-manage-employee',
  imports: [],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css',
})
export class ManageEmployeeComponent implements OnInit {
  EmployeeArr!: Employee[];
  constructor(
    private employeeServ: EmployeeService,
    private router: Router,
    private alertServ: AlertService
  ) {}
  ngOnInit() {
    this.alertServ.showLoading('Loading ..', 'Loading Employee Data');
    this.employeeServ.GetEmployeeAsync().subscribe({
      next: (res) => {
        this.EmployeeArr = res;
        this.alertServ.close();
      },
      error: (err) => {
        console.log('Error => ', err);
        this.alertServ.close();
      },
    });
  }
  NavigateToDetails(id: number) {
    this.router.navigate([`Manage-Employee/Employee-Details/${id}`]);
  }
  async DeleteEmployee(id: number) {
    let result = await this.alertServ.confirm(
      'Are you Sure that you want to delete selected employee ?',
      'Delete Employee'
    );
    if (result.isConfirmed) {
      this.alertServ.showLoading('Loading ..', 'Delete Employee Data');
      this.employeeServ.DeleteEmployee(id).subscribe({
        next: () => {
          this.employeeServ.GetEmployeeAsync().subscribe({
            next: (res) => {
              this.EmployeeArr = res;
              this.alertServ.close();
            },
            error: (err) => {
              console.log(err);
              this.alertServ.close();
            },
          });
        },
        error: (err) => {
          console.log(err);
        this.alertServ.close();
      },
      });
    }
  }
}
