import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../../models/employee';
import { EmployeeService } from '../../../../services/employee.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-employee',
  imports: [CommonModule,FormsModule],
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.css',
})
export class ManageEmployeeComponent implements OnInit {
  EmployeeArr!: Employee[];
  TotalPages:number=0;
  CurrentPage:number=1;
  constructor(
    private employeeServ: EmployeeService,
    private router: Router,
    private alertServ: AlertService
  ) {
    this.employeeServ.GetTotalPages(8).subscribe({
      next:(res)=>{
        this.TotalPages=res;
        this.CurrentPage=1;
      }
    })
  }
  ngOnInit() {
    this.alertServ.showLoading('Loading ..', 'Loading Employee Data');
    this.employeeServ.GetAllWithPagination(this.CurrentPage,8).subscribe({
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
  NextPage(){
    this.alertServ.showLoading();
    this.CurrentPage++;
    this.employeeServ.GetAllWithPagination(this.CurrentPage,8).subscribe({
      next:(res)=>{
        this.EmployeeArr=res;
        this.alertServ.close();
      }
    })
  }
  PrevPage(){
    this.alertServ.showLoading();
    this.CurrentPage--;
    this.employeeServ.GetAllWithPagination(this.CurrentPage,8).subscribe({
      next:(res)=>{
        this.EmployeeArr=res;
        this.alertServ.close();
      }
    })
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
          this.employeeServ.GetAllWithPagination(this.CurrentPage,8).subscribe({
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
